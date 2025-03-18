import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CosIcon, SenIcon, TanIcon, TrigonometryIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';

const operations: Operation[] = [
  {
    id: 'sen',
    title: 'Sine',
    icon: <SenIcon size={32} color='#6C3483' />,
    description: '10° ➙ 0.17',
  },
  {
    id: 'cos',
    title: 'Cosine',
    icon: <CosIcon size={32} color='#6C3483' />,
    description: '20° ➙ 0.94',
  },
  {
    id: 'tan',
    title: 'Tangent',
    icon: <TanIcon size={32} color='#6C3483' />,
    description: '180° ➙ 0',
  },
];

export default function Trigonometry() {
  const [result, setResult] = useState('The result will appear here');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [valueTextInputValues, setValueTextInputValues] = useState('');

  const handleOperationFromChild = (text: string) => {
    setSelectedOperation(text);
  };

  const handleCalculate = (selectedOperation: string) => {
    if (!valueTextInputValues) {
      setResult('Please enter an angle');
      return;
    }
    const angle = parseFloat(valueTextInputValues);
    if (isNaN(angle)) {
      setResult('Invalid input value');
      return;
    }
    if (selectedOperation === 'sen') {
      const radians = (angle * Math.PI) / 180;
      setResult(`sin(${angle}°) = ${Math.sin(radians).toFixed(2)}`);
    }
    if (selectedOperation === 'cos') {
      const radians = (angle * Math.PI) / 180;
      setResult(`cos(${angle}°) = ${Math.cos(radians).toFixed(2)}`);
    }
    if (selectedOperation === 'tan') {
      if (angle % 90 === 0 && angle % 180 !== 0) {
        setResult('Indefinite tangent for this angle');
        return;
      }
      const radians = (angle * Math.PI) / 180;
      setResult(`tan(${angle}°) = ${Math.tan(radians).toFixed(2)}`);
    }
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Trigonometry'
        icon={<TrigonometryIcon size={58} color='#6C3483' />}
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
            placeholder='Enter value (°)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={text => {
              const numericText = text.replace(/[^0-9]/g, '');
              const numericValue = Math.min(parseFloat(numericText), 360);
              setValueTextInputValues(numericText.slice(0, 3));
            }}
            maxLength={3}
          />
        </View>
      </View>

      {valueTextInputValues && (
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
