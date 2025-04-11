import { Animated, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  AverageIcon,
  MedianIcon,
  ModeIcon,
  StatisticsIcon,
  CalculateIcon,
} from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import React, { useEffect, useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Statistics() {
  const { t } = useTranslation();

  const operations: Operation[] = [
    {
      id: 'mean',
      title: t('statisticsCard.operations.mean.title'),
      icon: <AverageIcon size={32} color='#6C3483' />,
      description: t('statisticsCard.operations.mean.description'),
    },
    {
      id: 'median',
      title: t('statisticsCard.operations.median.title'),
      icon: <MedianIcon size={32} color='#6C3483' />,
      description: t('statisticsCard.operations.median.description'),
    },
    {
      id: 'mode',
      title: t('statisticsCard.operations.mode.title'),
      icon: <ModeIcon size={32} color='#6C3483' />,
      description: t('statisticsCard.operations.mode.description'),
    },
  ];

  const [result, setResult] = useState(t('statisticsCard.defaultResult'));
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [selectedOperation, setSelectedOperation] = useState<string>(operations[0]?.id || '');
  const [arr, setArr] = useState<string[]>([]);

  useEffect(() => {
    if (arr.length !== Number(valueTextInputValues)) {
      setArr(new Array(Number(valueTextInputValues)).fill(''));
    }
  }, [valueTextInputValues]);

  const handleOperationFromChild = (text: string) => {
    setSelectedOperation(text);
  };

  const generateInputs = (valueTextInputValues: number) => {
    const inputs = [];
    for (let i = 0; i < valueTextInputValues; i++) {
      inputs.push(
        <TextInput
          key={i}
          className='bg-gray-800 rounded-lg p-4 font-Satoshi text-center text-2xl w-48 text-slate-300'
          placeholder={t('statisticsCard.numberPlaceholder', { number: i + 1 })}
          placeholderTextColor='#cbd5e1'
          keyboardType='number-pad'
          onChangeText={text => {
            const newArr = [...arr];
            newArr[i] = text;
            setArr(newArr);
          }}
          value={arr[i]}
          maxLength={9}
        />,
      );
    }
    return inputs;
  };

  const handleCalculate = (selectedOperation: string) => {
    if (!valueTextInputValues) {
      setResult(t('statisticsCard.errors.enterNumberOfValues'));
      return;
    }
    const numbers = arr.map(num => parseFloat(num));
    if (numbers.some(isNaN)) {
      setResult(t('statisticsCard.errors.invalidInput'));
      return;
    }

    switch (selectedOperation) {
      case 'mean':
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        const mean = sum / numbers.length;
        setResult(t('statisticsCard.result.mean', { value: mean.toFixed(2) }));
        break;
      case 'median':
        const sortedNumbers = [...numbers].sort((a, b) => a - b);
        const middleIndex = Math.floor(sortedNumbers.length / 2);
        const median =
          sortedNumbers.length % 2 === 0
            ? (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
            : sortedNumbers[middleIndex];
        setResult(t('statisticsCard.result.median', { value: median.toFixed(2) }));
        break;
      case 'mode':
        const frequencyMap = new Map<number, number>();
        numbers.forEach(num => {
          frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        });
        const maxFrequency = Math.max(...frequencyMap.values());
        const mode =
          Array.from(frequencyMap.entries()).find(([_, freq]) => freq === maxFrequency)?.[0] || 0;
        setResult(t('statisticsCard.result.mode', { value: mode.toFixed(2) }));
        break;
      default:
        setResult(t('statisticsCard.errors.invalidOperation'));
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
    <ScrollView className='bg-background-app'>
      <HeaderPages />
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('statisticsCard.title')}
          icon={<StatisticsIcon size={48} color='#6C3483' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
        <CalculateComponent
          operations={operations}
          onCalculate={handleCalculate}
          onSendOperation={handleOperationFromChild}
        />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center mb-2'>
          {t('statisticsCard.values')}
        </Text>

        <View className=' w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('statisticsCard.howManyNumbers')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={text => {
              if (text === '') {
                setValueTextInputValues('');
                return;
              }
              const numericText = text.replace(/[^0-9]/g, '');
              const numericValue = Math.min(parseFloat(numericText), 50);
              setValueTextInputValues(numericValue <= 50 ? numericValue.toString() : '50');
            }}
          />
        </View>
      </View>

      <View className='mt-6 mx-auto mb-5 flex flex-row gap-4 flex-wrap justify-center'>
        {generateInputs(Number(valueTextInputValues))}
      </View>

      {Number(valueTextInputValues) > 0 &&
        arr.length === Number(valueTextInputValues) &&
        arr.every(value => value.trim() !== '') && (
          <View>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => handleCalculate(selectedOperation)}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('statisticsCard.calculateButton')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        )}
    </ScrollView>
  );
}
