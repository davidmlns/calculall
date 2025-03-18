import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DensityIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Density() {
  const [result, setResult] = useState('The result will appear here');
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');

  const calculateDensity = (mass: number, volume: number): string => {
    if (mass <= 0 || volume <= 0) return 'Values must be positive';
    if (volume === 0) return 'Volume cannot be zero';

    const density = mass / volume;
    return `Density: ${Number(density.toFixed(3))} kg/m³`;
  };

  const handleCalculateDensity = () => {
    const massValue = parseFloat(mass);
    const volumeValue = parseFloat(volume);

    if (!mass || !volume) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(massValue) || isNaN(volumeValue)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateDensity(massValue, volumeValue));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Density' icon={<DensityIcon size={52} color='#3498DB' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Mass (kg)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={mass}
            onChangeText={setMass}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Volume (m³)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={volume}
            onChangeText={setVolume}
            maxLength={7}
          />
        </View>
      </View>

      {mass && volume && (
        <View>
          <Pressable
            onPress={handleCalculateDensity}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
