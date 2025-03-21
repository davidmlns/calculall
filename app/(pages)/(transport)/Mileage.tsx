import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { FuelIcon, MileageIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Mileage() {
  const [result, setResult] = useState('The result will appear here');
  const [fuelAmount, setFuelAmount] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');

  const calculateMileage = (fuel: number, efficiency: number): string => {
    if (fuel <= 0 || efficiency <= 0) return 'Values must be positive';

    const distance = fuel * efficiency;
    return `Estimated: ${Number(distance.toFixed(2))} km`;
  };

  const handleCalculateMileage = () => {
    const fuel = parseFloat(fuelAmount);
    const efficiency = parseFloat(fuelEfficiency);

    if (!fuelAmount || !fuelEfficiency) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(fuel) || isNaN(efficiency)) {
      setResult('Invalid input values');
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
      <HeaderDescriptionPage title='Mileage' icon={<MileageIcon size={50} color='#7F8C8D' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Fuel Amount (L)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={fuelAmount}
            onChangeText={setFuelAmount}
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

      {fuelAmount && fuelEfficiency && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateMileage}
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
