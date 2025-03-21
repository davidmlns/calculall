import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import { useState } from 'react';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  Base2Icon,
  Base8Icon,
  Base16Icon,
  BaseNumericIcon,
  CalculateIcon,
} from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import CalculateComponent from '../../../components/CalculateComponent';

type Operation = {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
};

const operations: Operation[] = [
  {
    id: 'base2',
    title: 'Base 2',
    icon: <Base2Icon size={32} color='#6C3483' />,
    description: '45 ➙ 101101',
  },
  {
    id: 'base8',
    title: 'Base 8',
    icon: <Base8Icon size={32} color='#6C3483' />,
    description: '29 ➙ 35',
  },
  {
    id: 'base16',
    title: 'Base 16',
    icon: <Base16Icon size={32} color='#6C3483' />,
    description: '87 ➙ 57',
  },
];

const calculateResult = (value: string, base: number): string => {
  const number = parseInt(value.trim());
  if (isNaN(number)) return 'Invalid input';
  const converted = number.toString(base);
  return `${value} ➙ ${converted}`;
};

export default function BaseNumeric() {
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [result, setResult] = useState('The result will appear here');
  const [selectedOperation, setSelectedOperation] = useState(operations[0].id);
  const scaleValue = new Animated.Value(1);

  const handleCalculate = (operationId: string) => {
    if (!valueTextInputValues) {
      setResult('Please enter a value');
      return;
    }

    switch (operationId) {
      case 'base2':
        setResult(calculateResult(valueTextInputValues, 2));
        break;
      case 'base8':
        setResult(calculateResult(valueTextInputValues, 8));
        break;
      case 'base16':
        setResult(calculateResult(valueTextInputValues, 16));
        break;
      default:
        setResult('Invalid operation');
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

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Base Numeric'
        icon={<BaseNumericIcon size={58} color='#6C3483' />}
      />
      <ResultComponent result={result} />
      <CalculateComponent
        operations={operations}
        onCalculate={handleCalculate}
        onSendOperation={setSelectedOperation}
        selectedOperation={selectedOperation}
      />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>
        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 mx-auto rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter value (#)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={setValueTextInputValues}
            maxLength={5}
          />
        </View>
      </View>

      {valueTextInputValues && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => handleCalculate(selectedOperation)}
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
