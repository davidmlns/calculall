import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { FuelIcon, MileageIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Mileage() {
  const { t } = useTranslation('');
  const [result, setResult] = useState(t('mileageCard.defaultResult'));
  const [fuelAmount, setFuelAmount] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');

  const calculateMileage = (fuel: number, efficiency: number): string => {
    if (fuel <= 0 || efficiency <= 0) return t('mileageCard.positiveValuesRequired');

    const distance = fuel * efficiency;
    return t('mileageCard.estimatedResult', { distance: Number(distance.toFixed(2)) });
  };

  const handleCalculateMileage = () => {
    const fuel = parseFloat(fuelAmount);
    const efficiency = parseFloat(fuelEfficiency);

    if (!fuelAmount || !fuelEfficiency) {
      setResult(t('mileageCard.enterRequiredValues'));
      return;
    }

    if (isNaN(fuel) || isNaN(efficiency)) {
      setResult(t('mileageCard.invalidInput'));
      return;
    }

    setResult(calculateMileage(fuel, efficiency));
  };

  const scaleValue = new Animated.Value(1);

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
          title={t('mileageCard.title')}
          icon={<MileageIcon size={50} color='#7F8C8D' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-90 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('mileageCard.valuesTitle')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('mileageCard.fuelAmountPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={fuelAmount}
            onChangeText={setFuelAmount}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('mileageCard.fuelEfficiencyPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={fuelEfficiency}
            onChangeText={setFuelEfficiency}
            maxLength={5}
          />
        </View>
      </View>

      {fuelAmount && fuelEfficiency && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateMileage}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('mileageCard.calculateButtonA11yLabel')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
