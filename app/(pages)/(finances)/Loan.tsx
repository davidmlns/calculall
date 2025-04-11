import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { LoanIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Loan() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('loanCard.resultPlaceholder'));
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  const calculateLoan = (loanAmount: number, interestRate: number, loanTerm: number): string => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      return t('loanCard.errors.positiveValues');
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    return `${t('loanCard.results.monthlyPayment')}: ${t('common.currencySymbol')}${Number(monthlyPayment.toFixed(2))}`;
  };

  const handleCalculateLoan = () => {
    const l = parseFloat(loanAmount);
    const r = parseFloat(interestRate);
    const t = parseFloat(loanTerm);

    if (!loanAmount || !interestRate || !loanTerm) {
      setResult(t('loanCard.errors.requiredValues'));
      return;
    }

    if (isNaN(l) || isNaN(r) || isNaN(t)) {
      setResult(t('loanCard.errors.invalidInput'));
      return;
    }

    setResult(calculateLoan(l, r, t));
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
          title={t('loanCard.title')}
          icon={<LoanIcon size={52} color='#27AE60' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('loanCard.common.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl font-Satoshi  p-4 text-center text-2xl w-96 text-slate-300'
            placeholder={t('loanCard.placeholders.loanAmount')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={loanAmount}
            onChangeText={setLoanAmount}
            maxLength={7}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('loanCard.placeholders.interestRate')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={interestRate}
            onChangeText={setInterestRate}
            maxLength={3}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('loanCard.placeholders.loanTerm')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={loanTerm}
            onChangeText={setLoanTerm}
            maxLength={2}
          />
        </View>
      </View>

      {loanAmount && interestRate && loanTerm && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateLoan}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('loanCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
