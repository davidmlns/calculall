import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { EquationIcon, LinearEquationIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';
import {
  linearEquationMinus,
  linearEquationPlus,
  quadraticEquationMinusPlus,
  quadraticEquationPlusMinus,
} from '../../../utils/EquationsFunctions';

type EquationType =
  | 'linear-eq-plus'
  | 'linear-eq-minus'
  | 'quadratic-eq-plus-minus'
  | 'quadratic-eq-minus-plus';

const operations: Operation[] = [
  {
    id: 'linear-eq-plus',
    title: 'Linear equations (+)',
    icon: <LinearEquationIcon size={36} color='#6C3483' />,
    description: 'ax+b=c',
  },
  {
    id: 'linear-eq-minus',
    title: 'Linear equations (-)',
    icon: <LinearEquationIcon size={36} color='#6C3483' />,
    description: 'ax-b=c',
  },
  {
    id: 'quadratic-eq-plus-minus',
    title: 'Quadratic equations (+) (-)',
    icon: <EquationIcon size={32} color='#6C3483' />,
    description: 'ax²+bx-c=d',
  },
  {
    id: 'quadratic-eq-minus-plus',
    title: 'Quadratic equations (-) (+)',
    icon: <EquationIcon size={32} color='#6C3483' />,
    description: 'ax²-bx+c=d',
  },
];

export default function Equations() {
  const [result, setResult] = useState('The result will appear here');
  const [selectedOperation, setSelectedOperation] = useState<EquationType>('linear-eq-plus');
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');
  const [valueCTextInputValues, setValueCTextInputValues] = useState('');
  const [valueDTextInputValues, setValueDTextInputValues] = useState('');

  const handleCalculate = (selectedOperation: EquationType) => {
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
      case 'linear-eq-plus':
        resultText = `x = ${linearEquationPlus(a, b, c).toFixed(2)}`;
        break;
      case 'linear-eq-minus':
        resultText = `x = ${linearEquationMinus(a, b, c).toFixed(2)}`;
        break;
      case 'quadratic-eq-plus-minus': {
        const result = quadraticEquationPlusMinus(a, b, c, d);
        resultText = formatQuadraticResult(result);
        break;
      }
      case 'quadratic-eq-minus-plus': {
        const result = quadraticEquationMinusPlus(a, b, c, d);
        resultText = formatQuadraticResult(result);
        break;
      }
    }

    setResult(resultText);
  };

  const formatQuadraticResult = (result: number[] | string): string => {
    if (result === 'No real solutions') return result;
    if (result.length === 1) return `x = ${result[0].toFixed(2)}`;
    return `x1 = ${result[0].toFixed(2)}          x2 = ${result[1].toFixed(2)}`;
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Equations' icon={<EquationIcon size={58} color='#6C3483' />} />
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

        <View className='flex-row justify-around w-full'>
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
                maxLength={7}
              />
            </View>
          </View>

          {(selectedOperation === 'quadratic-eq-plus-minus' ||
            selectedOperation === 'quadratic-eq-minus-plus') && (
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
                  maxLength={7}
                />
              </View>
            </View>
          )}
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
      </View>
    </ScrollView>
  );
}
