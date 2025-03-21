import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { LoanIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Loan() {
  const [result, setResult] = useState('The result will appear here');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  const calculateLoan = (loanAmount: number, interestRate: number, loanTerm: number): string => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) return 'Values must be positive';

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return `Monthly Payment: $${Number(monthlyPayment.toFixed(2))}`;
  };

  const handleCalculateLoan = () => {
    const l = parseFloat(loanAmount);
    const r = parseFloat(interestRate);
    const t = parseFloat(loanTerm);

    if (!loanAmount || !interestRate || !loanTerm) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(l) || isNaN(r) || isNaN(t)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateLoan(l, r, t));
  };

  const scaleValue = new Animated.Value(1);

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
      <HeaderDescriptionPage title='Loan' icon={<LoanIcon size={52} color='#27AE60' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter loan amount ($)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={loanAmount}
            onChangeText={setLoanAmount}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter interest rate (%)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={interestRate}
            onChangeText={setInterestRate}
            maxLength={3}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter loan term (years)'
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
              accessibilityLabel='Calculate Button'>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
