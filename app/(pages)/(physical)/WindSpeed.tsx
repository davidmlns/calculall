import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { WindSpeedIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function WindSpeed() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('windSpeedCard.resultPlaceholder'));
  const [pressure, setPressure] = useState('');
  const [airDensity, setAirDensity] = useState('1.225');

  const calculateWindSpeed = (pressure: number, airDensity: number): string => {
    if (isNaN(pressure) || pressure <= 0) return t('windSpeedCard.errors.pressurePositive');
    if (isNaN(airDensity) || airDensity <= 0) return t('windSpeedCard.errors.airDensityPositive');
    return `${Math.sqrt((2 * pressure) / airDensity).toFixed(2)} ${t('windSpeed.unit')}`;
  };

  const handleCalculateWindSpeed = () => {
    const p = parseFloat(pressure);
    const density = parseFloat(airDensity);
    if (isNaN(p) || isNaN(density)) {
      setResult(t('windSpeedCard.errors.provideAllValues'));
      return;
    }
    setResult(calculateWindSpeed(p, density));
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
          title={t('windSpeedCard.title')}
          icon={<WindSpeedIcon size={56} color='#2E86C1' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('windSpeedCard.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('windSpeedCard.pressurePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={pressure}
            onChangeText={text => setPressure(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('windSpeedCard.airDensityPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={airDensity}
            onChangeText={text => setAirDensity(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
      </View>

      {pressure && airDensity && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateWindSpeed}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('windSpeedCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
