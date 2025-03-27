import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { EquationIcon, LinearEquationIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { Pressable, ScrollView, Text, TextInput, View, Animated } from 'react-native';
import { useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';
import {
  linearEquationMinus,
  linearEquationPlus,
  quadraticEquationMinusPlus,
  quadraticEquationPlusMinus,
} from '../../../utils/EquationsFunctions';
import { useTranslation } from 'react-i18next';

type EquationType =
  | 'linear-eq-plus'
  | 'linear-eq-minus'
  | 'quadratic-eq-plus-minus'
  | 'quadratic-eq-minus-plus';

export default function Equations() {
  const { t } = useTranslation();
  const [result, setResult] = useState<string>('');
  const [selectedOperation, setSelectedOperation] = useState<EquationType>('linear-eq-plus');
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');
  const [valueCTextInputValues, setValueCTextInputValues] = useState('');
  const [valueDTextInputValues, setValueDTextInputValues] = useState('');
  const scaleValue = new Animated.Value(1);

  const operations: Operation[] = [
    {
      id: 'linear-eq-plus',
      title: t('equationsCard.titleOp1'),
      icon: <LinearEquationIcon size={36} color='#6C3483' />,
      description: 'ax+b=c',
    },
    {
      id: 'linear-eq-minus',
      title: t('equationsCard.titleOp2'),
      icon: <LinearEquationIcon size={36} color='#6C3483' />,
      description: 'ax-b=c',
    },
    {
      id: 'quadratic-eq-plus-minus',
      title: t('equationsCard.titleOp3'),
      icon: <EquationIcon size={32} color='#6C3483' />,
      description: 'ax²+bx-c=d',
    },
    {
      id: 'quadratic-eq-minus-plus',
      title: t('equationsCard.titleOp4'),
      icon: <EquationIcon size={32} color='#6C3483' />,
      description: 'ax²-bx+c=d',
    },
  ];

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

  const handleCalculate = (operation: EquationType) => {
    const a = parseFloat(valueATextInputValues);
    const b = parseFloat(valueBTextInputValues) || 0;
    const c = parseFloat(valueCTextInputValues) || 0;
    const d = parseFloat(valueDTextInputValues) || 0;

    if (isNaN(a)) {
      setResult(t('equationsCard.invalidA'));
      return;
    }

    let resultText = '';

    try {
      switch (operation) {
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
        default:
          resultText = t('equationsCard.invalidOperation');
      }
    } catch (error) {
      resultText = t('equationsCard.calculationError');
    }

    setResult(resultText);
  };

  const clearInputValues = () => {
    setValueATextInputValues('');
    setValueBTextInputValues('');
    setValueCTextInputValues('');
    setValueDTextInputValues('');
  };

  const handleOperationChange = (operation: EquationType) => {
    clearInputValues();
    setSelectedOperation(operation);
  };

  const formatQuadraticResult = (result: number[] | string): string => {
    if (typeof result === 'string')
      return t(`equationsCard.${result.toLowerCase().replace(' ', '')}`);
    if (result.length === 1) return `x = ${result[0].toFixed(2)}`;
    return `x₁ = ${result[0].toFixed(2)}          x₂ = ${result[1].toFixed(2)}`;
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title={t('equationsCard.title')}
        icon={<EquationIcon size={58} color='#6C3483' />}
      />
      <ResultComponent result={result} />
      <CalculateComponent
        operations={operations}
        onCalculate={handleCalculate}
        onSendOperation={handleOperationChange}
        selectedOperation={selectedOperation}
      />

      <Text className='text-gray-300 text-2xl font-semibold text-center mt-4'>
        {t('equationsCard.values')}
      </Text>

      <View className='flex-row flex-wrap mt-2 mr-4 justify-center'>
        <View className='flex-row justify-around w-full'>
          <View className='mt-2'>
            <View className='flex-row items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                <Text className='text-black font-semibold text-xl'>
                  {t('equationsCard.valueA')}
                </Text>
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
                <Text className='text-black font-semibold text-xl'>
                  {t('equationsCard.valueB')}
                </Text>
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
                <Text className='text-black font-semibold text-xl'>
                  {t('equationsCard.valueC')}
                </Text>
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
                  <Text className='text-black font-semibold text-xl'>
                    {t('equationsCard.valueD')}
                  </Text>
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
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => handleCalculate(selectedOperation)}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('equationsCard.calculateButton')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
