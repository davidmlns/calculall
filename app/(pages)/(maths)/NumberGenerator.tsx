import { Pressable, ScrollView, Text, TextInput, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { NumberGeneratorIcon, CalculateIcon, FromIcon, UptoIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MAX_NUMBER = 999999;

export default function NumberGenerator() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('numberGeneratorCard.defaultResult'));
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');
  const scaleValue = new Animated.Value(1);

  const handleNumberGenerator = (valueA: string, valueB: string) => {
    const min = valueA === '' ? 0 : parseInt(valueA, 10);
    const max = valueB === '' ? MAX_NUMBER : parseInt(valueB, 10);

    if (isNaN(min) || isNaN(max)) {
      setResult(t('numberGeneratorCard.invalidInput'));
      return;
    }

    if (min > max) {
      setResult(t('numberGeneratorCard.minMaxError'));
      return;
    }

    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(t('numberGeneratorCard.result', { randomInt }));
  };

  const handleInputChange = (text: string, setValue: (value: string) => void) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const numericValue = Math.min(parseInt(numericText, 10), MAX_NUMBER);
    setValue(isNaN(numericValue) ? '' : numericValue.toString());
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('numberGeneratorCard.title')}
          icon={<NumberGeneratorIcon size={58} color='#6C3483' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex-col w-full'>
        <View className='mt-2 mx-auto mb-2'>
          <View className='flex-row items-center bg-gray-800 rounded-lg pr-3 pl-3 w-80 h-16'>
            <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
              <FromIcon size={22} color='#6C3483' />
            </View>
            <TextInput
              className='text-right text-2xl font-Satoshi text-slate-300 flex-1'
              placeholder='0'
              placeholderTextColor='#cbd5e1'
              keyboardType='number-pad'
              value={valueATextInputValues}
              onChangeText={text => handleInputChange(text, setValueATextInputValues)}
              maxLength={6}
            />
          </View>
        </View>

        <View className='mt-4 mx-auto'>
          <View className='flex-row justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-80 h-16'>
            <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
              <UptoIcon size={22} color='#6C3483' />
            </View>
            <TextInput
              className='text-right text-2xl font-Satoshi text-slate-300'
              placeholder='0'
              placeholderTextColor='#cbd5e1'
              keyboardType='number-pad'
              value={valueBTextInputValues}
              onChangeText={text => handleInputChange(text, setValueBTextInputValues)}
              maxLength={6}
            />
          </View>
        </View>
      </View>

      <View className='mt-5'>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handleNumberGenerator(valueATextInputValues, valueBTextInputValues)}
            className='rounded-2xl mx-auto mb-10'
            accessibilityLabel={t('numberGeneratorCard.generateButton')}>
            <CalculateIcon size={58} color='white' />
          </Pressable>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
