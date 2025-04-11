import { Pressable, ScrollView, Text, TextInput, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  DecimalIcon,
  FractionIcon,
  MinusIcon,
  MulIcon,
  SimplificationIcon,
  SumIcon,
  CalculateIcon,
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
import { useTranslation } from 'react-i18next';

type FractionOperation =
  | 'sum-fractions'
  | 'sub-fractions'
  | 'mul-fractions'
  | 'simpl-fractions'
  | 'dec-to-fractions';

export default function Fractions() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('fractionsCard.defaultResult'));
  const [selectedOperation, setSelectedOperation] = useState<FractionOperation>('sum-fractions');
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');
  const [valueCTextInputValues, setValueCTextInputValues] = useState('');
  const [valueDTextInputValues, setValueDTextInputValues] = useState('');
  const scaleValue = new Animated.Value(1);

  const operations: Operation[] = [
    {
      id: 'sum-fractions',
      title: t('fractionsCard.titleOp1'),
      icon: <SumIcon size={34} color='#6C3483' />,
      description: 'a/b + c/d',
    },
    {
      id: 'sub-fractions',
      title: t('fractionsCard.titleOp2'),
      icon: <MinusIcon size={34} color='#6C3483' />,
      description: 'a/b - c/d',
    },
    {
      id: 'mul-fractions',
      title: t('fractionsCard.titleOp3'),
      icon: <MulIcon size={34} color='#6C3483' />,
      description: 'a/b * c/d',
    },
    {
      id: 'simpl-fractions',
      title: t('fractionsCard.titleOp4'),
      icon: <SimplificationIcon size={34} color='#6C3483' />,
      description: 'a/b ➙ x/y',
    },
    {
      id: 'dec-to-fractions',
      title: t('fractionsCard.titleOp5'),
      icon: <DecimalIcon size={34} color='#6C3483' />,
      description: '0.1 ➙ 1/10',
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

  const handleCalculate = (selectedOperation: FractionOperation) => {
    if (!valueATextInputValues) {
      setResult(t('fractionsCard.errorA'));
      return;
    }

    const a = parseFloat(valueATextInputValues);
    const b = selectedOperation !== 'dec-to-fractions' ? parseFloat(valueBTextInputValues) || 1 : 1;
    const c = ['sum-fractions', 'sub-fractions', 'mul-fractions'].includes(selectedOperation)
      ? parseFloat(valueCTextInputValues) || 1
      : 1;
    const d = ['sum-fractions', 'sub-fractions', 'mul-fractions'].includes(selectedOperation)
      ? parseFloat(valueDTextInputValues) || 1
      : 1;

    if (isNaN(a)) {
      setResult(t('fractionsCard.invalidA'));
      return;
    }

    let resultText = '';

    try {
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
        default:
          resultText = t('fractionsCard.invalidOperation');
      }
    } catch (error) {
      resultText = t('fractionsCard.calculationError');
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
    return t('fractionsCard.resultFormat', { numerator, denominator });
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('fractionsCard.title')}
          icon={<FractionIcon size={46} color='#6C3483' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
        <CalculateComponent
          operations={operations}
          onCalculate={handleCalculate}
          onSendOperation={setSelectedOperation}
        />
      </View>

      <Text className='text-gray-300 text-2xl font-semibold font-Satoshi text-center mb-2'>
        {t('fractionsCard.values')}
      </Text>
      <View className='flex-row flex-wrap mr-4 justify-center'>
        <View className='flex-row justify-around w-full'>
          <View>
            <View className='flex-row items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                <Text className='text-black font-semibold font-Satoshi text-xl'>
                  {t('fractionsCard.valueA')}
                </Text>
              </View>
              <TextInput
                className='text-right text-2xl font-Satoshi text-slate-300 flex-1'
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
            <View>
              <View className='flex-row justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
                <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                  <Text className='text-black font-semibold font-Satoshi text-xl'>
                    {t('fractionsCard.valueB')}
                  </Text>
                </View>
                <TextInput
                  className='text-right text-2xl font-Satoshi text-slate-300'
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
                  <Text className='text-black font-semibold font-Satoshi text-xl'>
                    {t('fractionsCard.valueC')}
                  </Text>
                </View>
                <TextInput
                  className='text-right text-2xl font-Satoshi text-slate-300'
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
                  <Text className='text-black font-semibold font-Satoshi text-xl'>
                    {t('fractionsCard.valueD')}
                  </Text>
                </View>
                <TextInput
                  className='text-right text-2xl font-Satoshi text-slate-300'
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
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => handleCalculate(selectedOperation)}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('fractionsCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
