import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CO2Icon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CO2_EMISSION_FACTOR = 2.31; // kg CO₂ per liter of gasoline

export default function CO2() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('co2Card.resultPlaceholder'));
  const [fuelConsumed, setFuelConsumed] = useState('');
  const [distanceTraveled, setDistanceTraveled] = useState('');

  const calculateEmissions = (fuel: number, distance: number): string => {
    if (fuel <= 0 || distance <= 0) {
      return t('co2Card.errors.positiveValues');
    }

    const emissions = fuel * CO2_EMISSION_FACTOR;
    const efficiency = distance / fuel;
    return `${t('co2Card.results.emissions')}: ${Number(emissions.toFixed(2))} ${t('co2Card.unit')}\n${t('co2Card.results.efficiency')}: ${Number(efficiency.toFixed(2))} ${t('co2Card.efficiencyUnit')}`;
  };

  const handleCalculateEmissions = () => {
    const fuel = parseFloat(fuelConsumed);
    const distance = parseFloat(distanceTraveled);

    if (!fuelConsumed || !distanceTraveled) {
      setResult(t('co2Card.errors.requiredValues'));
      return;
    }

    if (isNaN(fuel) || isNaN(distance)) {
      setResult(t('co2Card.errors.invalidInput'));
      return;
    }

    setResult(calculateEmissions(fuel, distance));
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
          title={t('co2Card.title')}
          icon={<CO2Icon size={54} color='#7F8C8D' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('co2Card.common.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('co2Card.placeholders.fuelConsumed')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={fuelConsumed}
            onChangeText={setFuelConsumed}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('co2Card.placeholders.distanceTraveled')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distanceTraveled}
            onChangeText={setDistanceTraveled}
            maxLength={7}
          />
        </View>
      </View>

      {fuelConsumed && distanceTraveled && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateEmissions}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('co2Card.common.calculateButton')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
