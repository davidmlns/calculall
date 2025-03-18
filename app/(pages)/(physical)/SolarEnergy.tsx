import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { SunIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function SolarEnergy() {
  const [result, setResult] = useState('The result will appear here');
  const [radiationValue, setRadiationValue] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const calculateSolarEnergy = (radiation: number, area: number, time: number): string => {
    if (radiation <= 0 || area <= 0 || time <= 0) return 'Values must be positive';
    return `E = ${(radiation * area * time).toFixed(2)} J`;
  };

  const handleCalculateSolarEnergy = () => {
    const radiation = parseFloat(radiationValue);
    const area = parseFloat(areaValue);
    const time = parseFloat(timeValue);

    if (!radiationValue || !areaValue || !timeValue) {
      setResult('Please enter all values');
      return;
    }

    if (isNaN(radiation) || isNaN(area) || isNaN(time)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateSolarEnergy(radiation, area, time));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Solar Energy' icon={<SunIcon size={58} color='#2E86C1' />} />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter radiation (W/m²)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={radiationValue}
            onChangeText={setRadiationValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter area (m²)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={areaValue}
            onChangeText={setAreaValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter time (s)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={timeValue}
            onChangeText={setTimeValue}
            maxLength={9}
          />
        </View>
      </View>

      {radiationValue && areaValue && timeValue && (
        <View>
          <Pressable
            onPress={handleCalculateSolarEnergy}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
