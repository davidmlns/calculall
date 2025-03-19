import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { AverageIcon, MedianIcon, ModeIcon, StatisticsIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import React, { useEffect, useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';

const operations: Operation[] = [
  {
    id: 'mean',
    title: 'Mean',
    icon: <AverageIcon size={32} color='#6C3483' />,
    description: '[10, 20, 30, 40, 50] ➙ 30',
  },
  {
    id: 'median',
    title: 'Median',
    icon: <MedianIcon size={32} color='#6C3483' />,
    description: '[5, 3, 1, 4, 2] ➙ 3rd position ',
  },
  {
    id: 'mode',
    title: 'Mode',
    icon: <ModeIcon size={32} color='#6C3483' />,
    description: '[2, 4, 4, 6, 8] ➙ 4',
  },
];

export default function Statistics() {
  useEffect(() => {
    if (arr.length !== valueTextInputValues) {
      setArr(new Array(valueTextInputValues).fill(''));
    }
  }, [valueTextInputValues]);

  const [result, setResult] = useState('The result will appear here');
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [selectedOperation, setSelectedOperation] = useState<string>(operations[0]?.id || '');
  const [arr, setArr] = useState<string[]>([]);

  const handleOperationFromChild = (text: string) => {
    setSelectedOperation(text);
  };

  const generateInputs = (valueTextInputValues: number) => {
    const inputs = [];
    for (let i = 0; i < valueTextInputValues; i++) {
      inputs.push(
        <TextInput
          key={i}
          className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-48 text-slate-300'
          placeholder={`Number ${i + 1}`}
          placeholderTextColor='#cbd5e1'
          keyboardType='number-pad'
          onChangeText={text => {
            const newArr = [...arr];
            newArr[i] = text;
            setArr(newArr);
          }}
          value={arr[i]}
          maxLength={9}
        />,
      );
    }
    return inputs;
  };

  const handleCalculate = (selectedOperation: string) => {
    if (!valueTextInputValues) {
      setResult('Please enter the number of values');
      return;
    }
    const numbers = arr.map(num => parseFloat(num));
    if (numbers.some(isNaN)) {
      setResult('Invalid input values');
      return;
    }
    if (selectedOperation === 'mean') {
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      const mean = sum / numbers.length;
      setResult(`Mean: ${mean.toFixed(2)}`);
    }
    if (selectedOperation === 'median') {
      const sortedNumbers = [...numbers].sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedNumbers.length / 2);
      const median =
        sortedNumbers.length % 2 === 0
          ? (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
          : sortedNumbers[middleIndex];
      setResult(`Median: ${median.toFixed(2)}`);
    }
    if (selectedOperation === 'mode') {
      const frequencyMap = new Map<number, number>();
      numbers.forEach(num => {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
      });
      const maxFrequency = Math.max(...frequencyMap.values());
      const mode =
        Array.from(frequencyMap.entries()).find(([_, freq]) => freq === maxFrequency)?.[0] || 0;
      setResult(`Mode: ${mode.toFixed(2)}`);
    }
  };

  return (
    <ScrollView className='bg-background-app'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Statistics'
        icon={<StatisticsIcon size={52} color='#6C3483' />}
      />

      <ResultComponent result={result} />

      <CalculateComponent
        operations={operations}
        onCalculate={handleCalculate}
        onSendOperation={handleOperationFromChild}
      />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='How many numbers? Limit(50)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={text => {
              if (text === '') {
                setValueTextInputValues('');
                return;
              }
              const numericText = text.replace(/[^0-9]/g, '');
              const numericValue = Math.min(parseFloat(numericText), 50);
              setValueTextInputValues(numericValue <= 50 ? numericValue.toString() : '50');
            }}
          />
        </View>
      </View>

      <View className='mt-6 mx-auto flex flex-row gap-4 flex-wrap justify-center'>
        {generateInputs(valueTextInputValues)}
      </View>

      {Number(valueTextInputValues) > 0 &&
        arr.length === Number(valueTextInputValues) &&
        arr.every(value => value.trim() !== '') && (
          <View>
            <Pressable
              onPress={() => handleCalculate(selectedOperation)}
              className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mb-10 mx-auto mt-10'>
              <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
            </Pressable>
          </View>
        )}
    </ScrollView>
  );
}
