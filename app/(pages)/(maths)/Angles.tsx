import {
  AngleIcon,
  CalculateIcon,
  ComplementaryIcon,
  RadianIcon,
  SupplementaryIcon,
} from '../../../components/Icons';
import HeaderPages from '../../../components/HeaderPages';
import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
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

const getMaxLength = (operation: string): number => {
  switch (operation) {
    case 'deg-to-rad':
    case 'rad-to-deg':
      return 3; // Max 360
    case 'compl-deg':
      return 2; // Max 89
    case 'suppl-deg':
      return 3; // Max 179
    default:
      return 3;
  }
};

export default function Angles(): JSX.Element {
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [result, setResult] = useState('');
  const [selectedOperation, setSelectedOperation] = useState<string>(operations[0]?.id || '');
  const [error, setError] = useState<string | null>(null);
  const scaleValue = new Animated.Value(1);

  const handleOperationFromChild = (text: string): void => {
    setSelectedOperation(text);
  };

  const handleValueChange = (text: string) => {
    if (text === '') {
      setValueTextInputValues('');
      return;
    }

    const maxValue =
      {
        'deg-to-rad': 360,
        'rad-to-deg': 360,
        'compl-deg': 89,
        'suppl-deg': 179,
      }[selectedOperation] || 360;

    const numericValue = parseInt(text);
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(numericValue, maxValue);
      setValueTextInputValues(clampedValue.toString());
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleCalculate = (): void => {
    try {
      if (!valueTextInputValues) {
        throw new Error('Please enter a value');
      }
      const resultValue = calculateResult(valueTextInputValues.toString(), selectedOperation);
      const resultText = getResultText(
        valueTextInputValues.toString(),
        selectedOperation,
        resultValue,
      );
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
        onSendOperation={handleOperationFromChild}
        onCalculate={handleCalculate}
      />

      <View className='flex mt-6 mx-auto' accessibilityLabel='Values Input'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter value (°)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues === '' ? undefined : valueTextInputValues.toString()}
            onChangeText={handleValueChange}
            accessibilityLabel='Value Input'
            maxLength={getMaxLength(selectedOperation)}
          />
        </View>
      </View>

      {valueTextInputValues && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculate}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel='Calculate Button'>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
