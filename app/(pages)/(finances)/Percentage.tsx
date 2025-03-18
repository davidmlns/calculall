import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { PercentageIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Percentage() {
  const [result, setResult] = useState('The result will appear here');
  const [baseValue, setBaseValue] = useState('');
  const [percentage, setPercentage] = useState('');

  const calculatePercentage = (baseValue: number, percentage: number): string => {
    if (baseValue <= 0 || percentage <= 0) return 'Values must be positive';

    const calculatedValue = baseValue * (percentage / 100);
    return `Calculated Value: $${Number(calculatedValue.toFixed(2))}`;
  };

  const handleCalculatePercentage = () => {
    const b = parseFloat(baseValue);
    const p = parseFloat(percentage);

    if (!baseValue || !percentage) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(b) || isNaN(p)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculatePercentage(b, p));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Percentage'
        icon={<PercentageIcon size={52} color='#27AE60' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          Percentage Calculator
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter base value ($)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={baseValue}
            onChangeText={setBaseValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter percentage (%)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={percentage}
            onChangeText={setPercentage}
            maxLength={5}
          />
        </View>
      </View>

      {baseValue && percentage && (
        <View>
          <Pressable
            onPress={handleCalculatePercentage}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
