import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { InflationIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Inflation() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('inflationCard.resultPlaceholder'));
  const [currentValue, setCurrentValue] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [years, setYears] = useState('');

  const calculateInflation = (
    currentValue: number,
    inflationRate: number,
    years: number,
  ): string => {
    if (currentValue <= 0 || inflationRate <= 0 || years <= 0) {
      return t('inflationCard.errors.positiveValues');
    }

    const futureValue = currentValue * Math.pow(1 + inflationRate / 100, years);
    return `${t('inflationCard.results.futureValue')}: ${t('common.currencySymbol')}${Number(futureValue.toFixed(2))}`;
  };

  const handleCalculateInflation = () => {
    const v = parseFloat(currentValue);
    const r = parseFloat(inflationRate);
    const y = parseFloat(years);

    if (!currentValue || !inflationRate || !years) {
      setResult(t('inflationCard.errors.requiredValues'));
      return;
    }

    if (isNaN(v) || isNaN(r) || isNaN(y)) {
      setResult(t('inflationCard.errors.invalidInput'));
      return;
    }

    setResult(calculateInflation(v, r, y));
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
        title={t('inflationCard.title')}
        icon={<InflationIcon size={52} color='#27AE60' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('inflationCard.common.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('inflationCard.placeholders.currentValue')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={currentValue}
            onChangeText={setCurrentValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('inflationCard.placeholders.inflationRate')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={inflationRate}
            onChangeText={setInflationRate}
            maxLength={5}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('inflationCard.placeholders.years')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={years}
            onChangeText={setYears}
            maxLength={3}
          />
        </View>
      </View>

      {currentValue && inflationRate && years && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateInflation}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('inflationCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
