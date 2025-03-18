import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { MagnetismIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const PERMEABILITY = 4 * Math.PI * 1e-7; // μ₀ in N/A²

const calculateMagneticField = (current: number, distance: number): string => {
  return ((PERMEABILITY * current) / (2 * Math.PI * distance)).toExponential(2);
};

export default function Magnetism() {
  const [result, setResult] = useState('The result will appear here');
  const [currentValue, setCurrentValue] = useState('');
  const [distanceValue, setDistanceValue] = useState('');

  const handleCalculateMagnetism = () => {
    const current = parseFloat(currentValue);
    const distance = parseFloat(distanceValue);

    if (!currentValue || !distanceValue) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(current) || isNaN(distance)) {
      setResult('Invalid input values');
      return;
    }

    if (current < 0 || distance <= 0) {
      setResult('Values must be positive');
      return;
    }

    const magneticField = calculateMagneticField(current, distance);
    setResult(`B = ${magneticField} T`);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Magnetism' icon={<MagnetismIcon size={58} color='#2E86C1' />} />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter current (A)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={currentValue}
            onChangeText={setCurrentValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter distance (m)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distanceValue}
            onChangeText={setDistanceValue}
            maxLength={9}
          />
        </View>
      </View>

      {currentValue && distanceValue && (
        <View>
          <Pressable
            onPress={handleCalculateMagnetism}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
