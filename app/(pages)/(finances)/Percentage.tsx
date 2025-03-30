import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { PercentageIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Percentage() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('percentageCard.resultPlaceholder'));
  const [baseValue, setBaseValue] = useState('');
  const [percentage, setPercentage] = useState('');

  const calculatePercentage = (baseValue: number, percentage: number): string => {
    if (baseValue <= 0 || percentage <= 0) {
      return t('percentageCard.errors.positiveValues');
    }

    const calculatedValue = baseValue * (percentage / 100);
    return `${t('percentageCard.results.calculatedValue')}: ${t('common.currencySymbol')}${Number(calculatedValue.toFixed(2))}`;
  };

  const handleCalculatePercentage = () => {
    const b = parseFloat(baseValue);
    const p = parseFloat(percentage);

    if (!baseValue || !percentage) {
      setResult(t('percentageCard.errors.requiredValues'));
      return;
    }

    if (isNaN(b) || isNaN(p)) {
      setResult(t('percentageCard.errors.invalidInput'));
      return;
    }

    setResult(calculatePercentage(b, p));
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
        title={t('percentageCard.title')}
        icon={<PercentageIcon size={50} color='#27AE60' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('percentageCard.common.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('percentageCard.placeholders.baseValue')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={baseValue}
            onChangeText={setBaseValue}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('percentageCard.placeholders.percentage')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={percentage}
            onChangeText={setPercentage}
            maxLength={3}
          />
        </View>
      </View>

      {baseValue && percentage && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculatePercentage}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('percentageCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
