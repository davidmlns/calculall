import {
  AngleIcon,
  ComplementaryIcon,
  RadianIcon,
  SupplementaryIcon,
} from '../../../components/Icons';
import HeaderPages from '../../../components/HeaderPages';
import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderDescriptionPage from '@/components/HeaderDescriptionPage';
import CalculateComponent, { Operation } from '@/components/CalculateComponent';
import ResultComponent from '@/components/ResultComponent';
import { useState } from 'react';

const operations: Operation[] = [
  {
    id: 'deg-to-rad',
    title: 'Degrees to Radians',
    icon: <AngleIcon size={32} color='#6C3483' />,
    description: '10° ➙ 0.174533rad',
  },
  {
    id: 'rad-to-deg',
    title: 'Radians to Degrees',
    icon: <RadianIcon size={32} color='#6C3483' />,
    description: '2rad ➙ 360°',
  },
  {
    id: 'compl-deg',
    title: 'Complementary angles',
    icon: <ComplementaryIcon size={32} color='#6C3483' />,
    description: '10° + ∠ = 90°',
  },
  {
    id: 'suppl-deg',
    title: 'Supplementary angles',
    icon: <SupplementaryIcon size={32} color='#6C3483' />,
    description: '140° + ∠ = 180°',
  },
];

const calculateResult = (value: string, operation: string): number => {
  const numValue = parseFloat(value.trim());
  if (isNaN(numValue)) {
    throw new Error('Invalid input');
  }

  switch (operation) {
    case 'deg-to-rad':
      return (numValue * Math.PI) / 180;
    case 'rad-to-deg':
      return (numValue * 180) / Math.PI;
    case 'compl-deg':
      return 90 - numValue;
    case 'suppl-deg':
      return 180 - numValue;
    default:
      throw new Error('Invalid operation');
  }
};

const getResultText = (value: string, operation: string, result: number): string => {
  switch (operation) {
    case 'deg-to-rad':
      return `${value}° x 3.14 / 180° = ${result.toFixed(2).toString()} rad`;
    case 'rad-to-deg':
      return `${value}rad x 180° / 3.14 = ${result.toFixed(2).toString()}°`;
    case 'compl-deg':
      return `90° - ${value}° = ${result.toFixed(2).toString()}°`;
    case 'suppl-deg':
      return `180° - ${value}° = ${result.toFixed(2).toString()}°`;
    default:
      throw new Error('Invalid operation');
  }
};

export default function Angles(): JSX.Element {
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [result, setResult] = useState('');
  const [selectedOperation, setSelectedOperation] = useState<string>(operations[0]?.id || '');
  const [error, setError] = useState<string | null>(null);

  const handleOperationFromChild = (text: string): void => {
    setSelectedOperation(text);
  };

  const handleCalculate = (): void => {
    try {
      if (!valueTextInputValues) {
        throw new Error('Please enter a value');
      }
      const resultValue = calculateResult(valueTextInputValues, selectedOperation);
      const resultText = getResultText(valueTextInputValues, selectedOperation, resultValue);
      setResult(resultText);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ScrollView className='bg-background-app w-full h-full' accessibilityLabel='Angles Screen'>
      <HeaderPages />
      <HeaderDescriptionPage title='Angles' icon={<AngleIcon size={58} color='#6C3483' />} />

      <ResultComponent result={result} error={error} />

      <CalculateComponent
        operations={operations}
        onCalculate={handleCalculate}
        onSendOperation={handleOperationFromChild}
      />

      <View className='flex mt-6 mx-auto' accessibilityLabel='Values Input'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter value (°)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues.toString()}
            onChangeText={setValueTextInputValues}
            accessibilityLabel='Value Input'
            maxLength={3}
          />
        </View>
      </View>

      {valueTextInputValues && (
        <View>
          <Pressable
            onPress={handleCalculate}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'
            accessibilityLabel='Calculate Button'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
