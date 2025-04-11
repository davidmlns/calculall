import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ForceGravityIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GRAVITATIONAL_CONSTANT = 6.6743e-11;

const scaleValue = new Animated.Value(1);

export default function Gravity() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('gravityCard.defaultResult'));
  const [valueM1TextInputValues, setValueM1TextInputValues] = useState('');
  const [valueM2TextInputValues, setValueM2TextInputValues] = useState('');
  const [valueDistanceTextInputValues, setValueDistanceTextInputValues] = useState('');

  const handleCalculateGravity = () => {
    const m1 = parseFloat(valueM1TextInputValues);
    const m2 = parseFloat(valueM2TextInputValues);
    const distance = parseFloat(valueDistanceTextInputValues);

    if (!valueM1TextInputValues || !valueM2TextInputValues || !valueDistanceTextInputValues) {
      setResult(t('gravityCard.errors.enterAllValues'));
      return;
    }

    if (isNaN(m1) || isNaN(m2) || isNaN(distance)) {
      setResult(t('gravityCard.errors.invalidInput'));
      return;
    }

    if (m1 < 0 || m2 < 0 || distance <= 0) {
      setResult(t('gravityCard.errors.positiveValues'));
      return;
    }

    const force = (m1 * m2 * GRAVITATIONAL_CONSTANT) / (distance * distance);
    setResult(t('gravityCard.result', { value: force.toExponential(2) }));
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
          title={t('gravityCard.title')}
          icon={<ForceGravityIcon size={54} color='#2E86C1' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('gravityCard.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('gravityCard.mass1Placeholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueM1TextInputValues}
            onChangeText={setValueM1TextInputValues}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('gravityCard.mass2Placeholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueM2TextInputValues}
            onChangeText={setValueM2TextInputValues}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('gravityCard.distancePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueDistanceTextInputValues}
            onChangeText={setValueDistanceTextInputValues}
            maxLength={9}
          />
        </View>
      </View>

      {valueM1TextInputValues && valueM2TextInputValues && valueDistanceTextInputValues && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateGravity}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('gravityCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
