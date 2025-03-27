import { Pressable, ScrollView, Text, TextInput, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ProbabilityIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Probability() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('probabilityCard.defaultResult'));
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');
  const scaleValue = new Animated.Value(1);

  const calculateProbability = () => {
    const favorable = parseFloat(valueATextInputValues);
    const total = parseFloat(valueBTextInputValues);

    if (!valueATextInputValues || !valueBTextInputValues) {
      setResult(t('probabilityCard.enterBothValues'));
      return;
    }

    if (isNaN(favorable) || isNaN(total)) {
      setResult(t('probabilityCard.invalidInput'));
      return;
    }

    if (total <= 0 || favorable < 0) {
      setResult(t('probabilityCard.positiveValues'));
      return;
    }

    if (favorable > total) {
      setResult(t('probabilityCard.favorableError'));
      return;
    }

    const probability = ((favorable / total) * 100).toFixed(2);
    setResult(t('probabilityCard.result', { probability }));
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title={t('probabilityCard.title')}
        icon={<ProbabilityIcon size={54} color='#6C3483' />}
      />

      <ResultComponent result={result} />

      <View className='flex-row flex-wrap mt-2 justify-center'>
        <View className='flex-col justify-center items-center w-full'>
          <View className='mt-2'>
            <View className='flex-row items-center bg-gray-800 rounded-lg pr-3 pl-3 w-96 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2 w-44'>
                <Text className='text-black font-semibold text-xl text-center'>
                  {t('probabilityCard.favorableCases')}
                </Text>
              </View>
              <TextInput
                className='text-right text-2xl text-slate-300 flex-1'
                placeholder='0'
                placeholderTextColor='#cbd5e1'
                keyboardType='number-pad'
                value={valueATextInputValues}
                onChangeText={setValueATextInputValues}
                maxLength={9}
              />
            </View>
          </View>

          <View className='mt-2'>
            <View className='flex-row justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-96 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2 w-44 '>
                <Text className='text-black font-semibold text-xl text-center'>
                  {t('probabilityCard.totalCases')}
                </Text>
              </View>
              <TextInput
                className='text-right text-2xl text-slate-300'
                placeholder='0'
                placeholderTextColor='#cbd5e1'
                keyboardType='number-pad'
                value={valueBTextInputValues}
                onChangeText={setValueBTextInputValues}
                maxLength={9}
              />
            </View>
          </View>
        </View>
      </View>

      <View className='mt-5'>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={calculateProbability}
            className='rounded-2xl mx-auto mb-10'
            accessibilityLabel={t('probabilityCard.calculateButton')}>
            <CalculateIcon size={58} color='white' />
          </Pressable>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
