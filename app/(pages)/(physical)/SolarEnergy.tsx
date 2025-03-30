import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { SunIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function SolarEnergy() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('solarEnergyCard.defaultResult'));
  const [radiationValue, setRadiationValue] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const calculateSolarEnergy = (radiation: number, area: number, time: number): string => {
    if (radiation <= 0 || area <= 0 || time <= 0) return t('solarEnergyCard.errors.positiveValues');
    return t('solarEnergyCard.result', { value: (radiation * area * time).toFixed(2) });
  };

  const handleCalculateSolarEnergy = () => {
    const radiation = parseFloat(radiationValue);
    const area = parseFloat(areaValue);
    const time = parseFloat(timeValue);

    if (!radiationValue || !areaValue || !timeValue) {
      setResult(t('solarEnergyCard.errors.enterAllValues'));
      return;
    }

    if (isNaN(radiation) || isNaN(area) || isNaN(time)) {
      setResult(t('solarEnergyCard.errors.invalidInput'));
      return;
    }

    setResult(calculateSolarEnergy(radiation, area, time));
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
        title={t('solarEnergyCard.title')}
        icon={<SunIcon size={52} color='#2E86C1' />}
      />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('solarEnergyCard.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('solarEnergyCard.radiationPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={radiationValue}
            onChangeText={setRadiationValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('solarEnergyCard.areaPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={areaValue}
            onChangeText={setAreaValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('solarEnergyCard.timePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={timeValue}
            onChangeText={setTimeValue}
            maxLength={9}
          />
        </View>
      </View>

      {radiationValue && areaValue && timeValue && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateSolarEnergy}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('solarEnergyCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
