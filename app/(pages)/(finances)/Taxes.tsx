import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { TaxesIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Taxes() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('taxesCard.resultPlaceholder'));
  const [income, setIncome] = useState('');
  const [taxRate, setTaxRate] = useState('');

  const calculateTax = (income: number, taxRate: number): string => {
    if (income <= 0 || taxRate <= 0) {
      return t('taxesCard.errors.positiveValues');
    }

    const taxAmount = income * (taxRate / 100);
    return `${t('taxesCard.results.taxAmount')}: ${t('common.currencySymbol')}${Number(taxAmount.toFixed(2))}`;
  };

  const handleCalculateTax = () => {
    const i = parseFloat(income);
    const t = parseFloat(taxRate);

    if (!income || !taxRate) {
      setResult(t('taxesCard.errors.requiredValues'));
      return;
    }

    if (isNaN(i) || isNaN(t)) {
      setResult(t('taxesCard.errors.invalidInput'));
      return;
    }

    setResult(calculateTax(i, t));
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('taxesCard.title')}
          icon={<TaxesIcon size={50} color='#27AE60' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('taxesCard.common.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('taxesCard.placeholders.income')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={income}
            onChangeText={setIncome}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('taxesCard.placeholders.taxRate')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={taxRate}
            onChangeText={setTaxRate}
            maxLength={5}
          />
        </View>
      </View>

      {income && taxRate && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateTax}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('taxesCard.common.calculateButton')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
