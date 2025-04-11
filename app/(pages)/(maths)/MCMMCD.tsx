import HeaderPages from '../../../components/HeaderPages';
import {
  MaximumCommonDivisorIcon,
  MCMMCDIcon,
  MinimumCommonMultipleIcon,
  CalculateIcon,
} from '../../../components/Icons';
import { Pressable, ScrollView, Text, TextInput, View, Animated } from 'react-native';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { useState } from 'react';
import ResultComponent from '../../../components/ResultComponent';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';
import { useTranslation } from 'react-i18next';

type OperationType = 'mcm' | 'mcd';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export default function MCMMCD() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('mcmmcdCard.defaultResult'));
  const [selectedOperation, setSelectedOperation] = useState<OperationType>('mcm');
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');
  const scaleValue = new Animated.Value(1);

  const operations: Operation[] = [
    {
      id: 'mcm',
      title: t('mcmmcdCard.mcm'),
      icon: <MinimumCommonMultipleIcon size={34} color='#6C3483' />,
      description: t('mcmmcdCard.mcmExample'),
    },
    {
      id: 'mcd',
      title: t('mcmmcdCard.mcd'),
      icon: <MaximumCommonDivisorIcon size={34} color='#6C3483' />,
      description: t('mcmmcdCard.mcdExample'),
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

  const handleCalculate = (selectedOperation: OperationType) => {
    const a = parseFloat(valueATextInputValues);
    const b = parseFloat(valueBTextInputValues);

    if (!valueATextInputValues || !valueBTextInputValues) {
      setResult(t('mcmmcdCard.enterBothValues'));
      return;
    }

    if (isNaN(a) || isNaN(b)) {
      setResult(t('mcmmcdCard.invalidInput'));
      return;
    }

    if (a <= 0 || b <= 0) {
      setResult(t('mcmmcdCard.positiveValues'));
      return;
    }

    if (selectedOperation === 'mcm') {
      const result = (a * b) / gcd(a, b);
      setResult(t('mcmmcdCard.mcmResult', { result }));
    } else {
      const result = gcd(a, b);
      setResult(t('mcmmcdCard.mcdResult', { result }));
    }
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('mcmmcdCard.title')}
          icon={<MCMMCDIcon size={54} color='#6C3483' />}
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

      <View className='flex-row flex-wrap  mr-4 justify-center'>
        <View className='flex-row justify-around w-full'>
          <View>
            <View className='flex-row items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                <Text className='text-black font-semibold font-Satoshi text-xl'>
                  {t('mcmmcdCard.valueA')}
                </Text>
              </View>
              <TextInput
                className='text-right text-2xl font-Satoshi text-slate-300 flex-1'
                placeholder='0'
                placeholderTextColor='#cbd5e1'
                keyboardType='number-pad'
                value={valueATextInputValues}
                onChangeText={setValueATextInputValues}
                maxLength={7}
              />
            </View>
          </View>

          <View>
            <View className='flex-row justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-48 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                <Text className='text-black font-semibold font-Satoshi text-xl'>
                  {t('mcmmcdCard.valueB')}
                </Text>
              </View>
              <TextInput
                className='text-right text-2xl font-Satoshi text-slate-300'
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
      </View>

      {valueATextInputValues && valueBTextInputValues && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => handleCalculate(selectedOperation)}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('mcmmcdCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
