import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  DecimalIcon,
  FractionIcon,
  MinusIcon,
  MulIcon,
  SimplificationIcon,
  SumIcon,
} from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';
import {
  decimalToFractionFunction,
  mulFractions,
  simplificationFraction,
  subFractions,
  sumFractions,
} from '../../../utils/FractionsFunctions';

type FractionOperation =
  | 'sum-fractions'
  | 'sub-fractions'
  | 'mul-fractions'
  | 'simpl-fractions'
  | 'dec-to-fractions';

const operations: Operation[] = [
  {
    id: 'sum-fractions',
    title: 'Sum of Fractions',
    icon: <SumIcon size={34} color='#6C3483' />,
    description: 'a/b + c/d',
  },
  {
    id: 'sub-fractions',
    title: 'Subtraction of Fractions',
    icon: <MinusIcon size={34} color='#6C3483' />,
    description: 'a/b - c/d',
  },
  {
    id: 'mul-fractions',
    title: 'Multiplication of Fractions',
    icon: <MulIcon size={34} color='#6C3483' />,
    description: 'a/b* c/d',
  },
  {
    id: 'simpl-fractions',
    title: 'Simplification of Fractions',
    icon: <SimplificationIcon size={34} color='#6C3483' />,
    description: 'a/b ➙ x/y',
  },
  {
    id: 'dec-to-fractions',
    title: 'Decimal to Fraction',
    icon: <DecimalIcon size={34} color='#6C3483' />,
    description: '0.1 ➙ 1/10',
  },
];

export default function Fractions() {
  const [result, setResult] = useState('The result will appear here');
  const [selectedOperation, setSelectedOperation] = useState<FractionOperation>('sum-fractions');
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');
  const [valueCTextInputValues, setValueCTextInputValues] = useState('');
  const [valueDTextInputValues, setValueDTextInputValues] = useState('');

  const handleCalculate = (selectedOperation: FractionOperation) => {
    if (!valueATextInputValues) {
      setResult('Please enter value A');
      return;
    }

    const a = parseFloat(valueATextInputValues);
    const b = parseFloat(valueBTextInputValues);
    const c = parseFloat(valueCTextInputValues);
    const d = parseFloat(valueDTextInputValues);

    if (isNaN(a)) {
      setResult('Invalid value for A');
      return;
    }

    let resultText = '';

    switch (selectedOperation) {
      case 'sum-fractions':
        resultText = formatFractionResult(sumFractions(a, b, c, d));
        break;
      case 'sub-fractions':
        resultText = formatFractionResult(subFractions(a, b, c, d));
        break;
      case 'mul-fractions':
        resultText = formatFractionResult(mulFractions(a, b, c, d));
        break;
      case 'simpl-fractions':
        resultText = formatFractionResult(simplificationFraction(a, b));
        break;
      case 'dec-to-fractions':
        resultText = formatFractionResult(decimalToFractionFunction(a));
        break;
    }

    setResult(resultText);
  };

  const formatFractionResult = ({
    numerator,
    denominator,
  }: {
    numerator: number;
    denominator: number;
  }) => {
    return `Result: ${numerator}/${denominator}`;
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Fractions' icon={<FractionIcon size={48} color='#6C3483' />} />
      <ResultComponent result={result} />
      <CalculateComponent
        operations={operations}
        onCalculate={handleCalculate}
        onSendOperation={setSelectedOperation}
      />

      <Text className='text-gray-300 text-2xl font-semibold text-center mt-4'>Values</Text>
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
                maxLength={4}
              />
            </View>
          </View>

          {selectedOperation !== 'dec-to-fractions' && (
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
                  maxLength={4}
                />
              </View>
            </View>
          )}
        </View>

        <View className='flex-row justify-around w-full'>
          {selectedOperation !== 'simpl-fractions' && selectedOperation !== 'dec-to-fractions' && (
            <View className='mt-4'>
              <View className='flex-row justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
                <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                  <Text className='text-black font-semibold text-xl'>C</Text>
                </View>
                <TextInput
                  className='text-right text-2xl text-slate-300'
                  placeholder='0'
                  placeholderTextColor='#cbd5e1'
                  keyboardType='number-pad'
                  value={valueCTextInputValues}
                  onChangeText={setValueCTextInputValues}
                  maxLength={4}
                />
              </View>
            </View>
          )}

          {selectedOperation !== 'simpl-fractions' && selectedOperation !== 'dec-to-fractions' && (
            <View className='mt-4'>
              <View className='flex-row justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
                <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                  <Text className='text-black font-semibold text-xl'>D</Text>
                </View>
                <TextInput
                  className='text-right text-2xl text-slate-300'
                  placeholder='0'
                  placeholderTextColor='#cbd5e1'
                  keyboardType='number-pad'
                  value={valueDTextInputValues}
                  onChangeText={setValueDTextInputValues}
                  maxLength={4}
                />
              </View>
            </View>
          )}
        </View>
      </View>

      {valueATextInputValues && (
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
