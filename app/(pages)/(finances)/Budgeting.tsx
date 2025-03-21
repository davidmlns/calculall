import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { BudgetingIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const scaleValue = new Animated.Value(1);

export default function Budgeting() {
  const [result, setResult] = useState('The result will appear here');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');

  const calculateBudget = (
    income: number,
    expenses: number,
    savingsGoal: number | null,
  ): string => {
    if (income <= 0 || expenses <= 0) return 'Values must be positive';
    if (savingsGoal !== null && savingsGoal <= 0) return 'Savings goal must be positive';

    let remaining = income - expenses;

    if (savingsGoal !== null && remaining > savingsGoal) {
      remaining = savingsGoal;
    }

    if (remaining < 0) {
      return `Deficit: $${Math.abs(Number(remaining.toFixed(2)))}`;
    }

    return `Remaining: $${Number(remaining.toFixed(2))}`;
  };

  const handleCalculateBudget = () => {
    const i = parseFloat(income);
    const e = parseFloat(expenses);
    const s = savingsGoal ? parseFloat(savingsGoal) : null;

    if (!income || !expenses) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(i) || isNaN(e) || (s !== null && isNaN(s))) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateBudget(i, e, s));
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
      <HeaderDescriptionPage title='Budgeting' icon={<BudgetingIcon size={50} color='#27AE60' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter income ($)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={income}
            onChangeText={setIncome}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter expenses ($)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={expenses}
            onChangeText={setExpenses}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter savings goal ($)*'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={savingsGoal}
            onChangeText={setSavingsGoal}
            maxLength={9}
          />
        </View>
      </View>

      {income && expenses && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateBudget}
              className=' rounded-2xl mx-auto mb-10'
              accessibilityLabel='Calculate Button'>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
