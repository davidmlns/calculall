import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  CosIcon,
  SenIcon,
  TanIcon,
  TrigonometryIcon,
  CalculateIcon,
} from '../../../components/Icons';
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

const scaleValue = new Animated.Value(1);

export default function Trigonometry() {
  const [result, setResult] = useState('The result will appear here');
  const [selectedOperation, setSelectedOperation] = useState<string>(operations[0]?.id || '');
  const [valueTextInputValues, setValueTextInputValues] = useState('');

  const handleOperationFromChild = (text: string) => {
    setSelectedOperation(text);
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
        icon={<TrigonometryIcon size={54} color='#6C3483' />}
      />

      <ResultComponent result={result} />

      <CalculateComponent
        operations={operations}
        onCalculate={handleCalculate}
        onSendOperation={handleOperationFromChild}
      />

      <View className='flex mt-6 mx-auto mb-5'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter value (°)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={text => {
              const numericText = text.replace(/[^0-9]/g, '');
              setValueTextInputValues(numericText.slice(0, 3));
            }}
            maxLength={3}
          />
        </View>
      </View>

      {valueTextInputValues && (
        <View>
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
