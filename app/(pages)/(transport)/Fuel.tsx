import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { FuelIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Fuel() {
  const [result, setResult] = useState('The result will appear here');
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');

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

  const calculateFuel = (distance: number, efficiency: number): string => {
    if (distance <= 0 || efficiency <= 0) return 'Values must be positive';

    const fuel = distance / efficiency;
    return `Fuel needed: ${Number(fuel.toFixed(2))} L`;
  };

  const handleCalculateFuel = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);

    if (!distance || !fuelEfficiency) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(dist) || isNaN(efficiency)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateFuel(dist, efficiency));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Fuel' icon={<FuelIcon size={52} color='#7F8C8D' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Distance (km)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distance}
            onChangeText={setDistance}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Fuel Efficiency (km/L)'
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
              accessibilityLabel='Calculate Button'>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
