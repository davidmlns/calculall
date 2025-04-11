import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { WavelengthIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Wavelength() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('wavelengthCard.defaultResult'));
  const [velocity, setVelocity] = useState('');
  const [frequency, setFrequency] = useState('');

  const calculateWavelength = (velocity: number, frequency: number): string => {
    if (isNaN(velocity) || velocity <= 0) return t('wavelengthCard.errors.positiveVelocity');
    if (isNaN(frequency) || frequency <= 0) return t('wavelengthCard.errors.positiveFrequency');
    return t('wavelengthCard.result', { value: (velocity / frequency).toFixed(2) });
  };

  const handleCalculateWavelength = () => {
    const v = parseFloat(velocity);
    const f = parseFloat(frequency);
    if (isNaN(v) || isNaN(f)) {
      setResult(t('wavelengthCard.errors.enterAllValues'));
      return;
    }
    setResult(calculateWavelength(v, f));
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
          title={t('wavelengthCard.title')}
          icon={<WavelengthIcon size={52} color='#2E86C1' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('wavelengthCard.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('wavelengthCard.velocityPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={velocity}
            onChangeText={text => setVelocity(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('wavelengthCard.frequencyPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={frequency}
            onChangeText={text => setFrequency(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
      </View>

      {velocity && frequency && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateWavelength}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('wavelengthCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
