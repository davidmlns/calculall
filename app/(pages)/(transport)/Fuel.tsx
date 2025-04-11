import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { FuelIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Fuel() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('fuelCard.resultPlaceholder'));
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');

  const calculateFuel = (distance: number, efficiency: number): string => {
    if (distance <= 0 || efficiency <= 0) {
      return t('fuelCard.errors.positiveValues');
    }

    const fuel = distance / efficiency;
    return `${t('fuelCard.results.fuelNeeded')}: ${Number(fuel.toFixed(2))} ${t('fuelCard.unit')}`;
  };

  const handleCalculateFuel = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);

    if (!distance || !fuelEfficiency) {
      setResult(t('fuelCard.errors.requiredValues'));
      return;
    }

    if (isNaN(dist) || isNaN(efficiency)) {
      setResult(t('fuelCard.errors.invalidInput'));
      return;
    }

    setResult(calculateFuel(dist, efficiency));
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
          title={t('fuelCard.title')}
          icon={<FuelIcon size={52} color='#7F8C8D' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-90 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('fuelCard.common.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('fuelCard.placeholders.distance')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distance}
            onChangeText={setDistance}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('fuelCard.placeholders.fuelEfficiency')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={fuelEfficiency}
            onChangeText={setFuelEfficiency}
            maxLength={5}
          />
        </View>
      </View>

      {distance && fuelEfficiency && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateFuel}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('fuelCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
