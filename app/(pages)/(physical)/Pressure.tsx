import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { PressureIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const calculatePressure = (force: number, area: number): string => {
  if (force <= 0 || area <= 0) return 'Values must be positive';
  return `P = ${(force / area).toFixed(2)} Pa`;
};

export default function Pressure() {
  const [result, setResult] = useState('The result will appear here');
  const [forceValue, setForceValue] = useState('');
  const [areaValue, setAreaValue] = useState('');

  const handleCalculatePressure = () => {
    const force = parseFloat(forceValue);
    const area = parseFloat(areaValue);

    if (!forceValue || !areaValue) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(force) || isNaN(area)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculatePressure(force, area));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Pressure' icon={<PressureIcon size={58} color='#2E86C1' />} />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter force (N)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={forceValue}
            onChangeText={setForceValue}
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
      </View>

      {forceValue && areaValue && (
        <View>
          <Pressable
            onPress={handleCalculatePressure}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
