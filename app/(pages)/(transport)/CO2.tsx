import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CO2Icon } from '../../../components/Icons';
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

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='CO₂ Emissions' icon={<CO2Icon size={52} color='#7F8C8D' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
          <Pressable
            onPress={handleCalculateEmissions}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
