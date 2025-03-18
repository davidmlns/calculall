import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { FuelIcon, MileageIcon } from '../../../components/Icons';
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

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Mileage' icon={<MileageIcon size={52} color='#7F8C8D' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
          <Pressable
            onPress={handleCalculateMileage}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
