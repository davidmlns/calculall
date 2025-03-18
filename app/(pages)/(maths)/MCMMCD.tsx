import HeaderPages from '../../../components/HeaderPages';
import {
  MaximumCommonDivisorIcon,
  MCMMCDIcon,
  MinimumCommonMultipleIcon,
} from '../../../components/Icons';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { useState } from 'react';
import ResultComponent from '../../../components/ResultComponent';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';

type OperationType = 'mcm' | 'mcd';

const operations: Operation[] = [
  {
    id: 'mcm',
    title: 'Minimum Common Multiple',
    icon: <MinimumCommonMultipleIcon size={34} color='#6C3483' />,
    description: '10 x 15 ➙ 30',
  },
  {
    id: 'mcd',
    title: 'Maximum Common Divisor',
    icon: <MaximumCommonDivisorIcon size={34} color='#6C3483' />,
    description: '10 x 15 ➙ 5',
  },
];

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export default function MCMMCD() {
  const [result, setResult] = useState('The result will appear here');
  const [selectedOperation, setSelectedOperation] = useState<OperationType>('mcm');
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');

  const handleCalculate = (selectedOperation: OperationType) => {
    const a = parseFloat(valueATextInputValues);
    const b = parseFloat(valueBTextInputValues);

    if (!valueATextInputValues || !valueBTextInputValues) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(a) || isNaN(b)) {
      setResult('Invalid input values');
      return;
    }

    if (a <= 0 || b <= 0) {
      setResult('Values must be positive');
      return;
    }

    if (selectedOperation === 'mcm') {
      const result = (a * b) / gcd(a, b);
      setResult(result.toString());
    } else {
      const result = gcd(a, b);
      setResult(result.toString());
    }
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='MCM/MCD' icon={<MCMMCDIcon size={58} color='#6C3483' />} />

      <ResultComponent result={result} />

      <CalculateComponent
        operations={operations}
        onCalculate={handleCalculate}
        onSendOperation={setSelectedOperation}
      />

      <View className='flex-row flex-wrap mt-2 mr-4 justify-center'>
        <View className='flex-row justify-around w-full'>
          <View className='mt-2'>
            <View className='flex-row items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                <Text className='text-black font-semibold text-xl'>A</Text>
              </View>
              <TextInput
                className='text-right text-2xl text-slate-300 flex-1'
                placeholder='0'
                placeholderTextColor='#cbd5e1'
                keyboardType='number-pad'
                value={valueATextInputValues}
                onChangeText={setValueATextInputValues}
                maxLength={7}
              />
            </View>
          </View>

          <View className='mt-2'>
            <View className='flex-row justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                <Text className='text-black font-semibold text-xl'>B</Text>
              </View>
              <TextInput
                className='text-right text-2xl text-slate-300'
                placeholder='0'
                placeholderTextColor='#cbd5e1'
                keyboardType='number-pad'
                value={valueBTextInputValues}
                onChangeText={setValueBTextInputValues}
                maxLength={7}
              />
            </View>
          </View>
        </View>
      </View>

      {valueATextInputValues && valueBTextInputValues && (
        <View>
          <Pressable
            onPress={() => handleCalculate(selectedOperation)}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
