import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { InflationIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Inflation() {
  const [result, setResult] = useState('The result will appear here');
  const [currentValue, setCurrentValue] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [years, setYears] = useState('');

  const calculateInflation = (
    currentValue: number,
    inflationRate: number,
    years: number,
  ): string => {
    if (currentValue <= 0 || inflationRate <= 0 || years <= 0) return 'Values must be positive';

    const futureValue = currentValue * Math.pow(1 + inflationRate / 100, years);
    return `Future Value: $${Number(futureValue.toFixed(2))}`;
  };

  const handleCalculateInflation = () => {
    const v = parseFloat(currentValue);
    const r = parseFloat(inflationRate);
    const y = parseFloat(years);

    if (!currentValue || !inflationRate || !years) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(v) || isNaN(r) || isNaN(y)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateInflation(v, r, y));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Inflation' icon={<InflationIcon size={52} color='#27AE60' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter current value ($)'
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
            placeholder='Enter inflation rate (%)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={inflationRate}
            onChangeText={setInflationRate}
            maxLength={5}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter years'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={years}
            onChangeText={setYears}
            maxLength={3}
          />
        </View>
      </View>

      {currentValue && inflationRate && years && (
        <View>
          <Pressable
            onPress={handleCalculateInflation}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
