import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CO2Icon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const CO2_EMISSION_FACTOR = 2.31; // kg CO₂ per liter of gasoline

export default function CO2() {
  const [result, setResult] = useState('The result will appear here');
  const [fuelConsumed, setFuelConsumed] = useState('');
  const [distanceTraveled, setDistanceTraveled] = useState('');

  const calculateEmissions = (fuel: number, distance: number): string => {
    if (fuel <= 0 || distance <= 0) return 'Values must be positive';

    const emissions = fuel * CO2_EMISSION_FACTOR;
    return `Emissions: ${Number(emissions.toFixed(2))} kg CO₂`;
  };

  const handleCalculateEmissions = () => {
    const fuel = parseFloat(fuelConsumed);
    const distance = parseFloat(distanceTraveled);

    if (!fuelConsumed || !distanceTraveled) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(fuel) || isNaN(distance)) {
      setResult('Invalid input values');
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
      <HeaderDescriptionPage title='CO₂ Emissions' icon={<CO2Icon size={54} color='#7F8C8D' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Fuel Consumed (L)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={fuelConsumed}
            onChangeText={setFuelConsumed}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Distance Traveled (km)'
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
                accessibilityLabel='Calculate Button'>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
