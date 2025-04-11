import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { BudgetingIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Budgeting() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('budgetingCard.resultPlaceholder'));
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');

  const calculateBudget = (
    income: number,
    expenses: number,
    savingsGoal: number | null,
  ): string => {
    if (income <= 0 || expenses <= 0) return t('budgetingCard.errors.positiveValues');
    if (savingsGoal !== null && savingsGoal <= 0)
      return t('budgetingCard.errors.positiveSavingsGoal');

    let remaining = income - expenses;

    if (savingsGoal !== null && remaining > savingsGoal) {
      remaining = savingsGoal;
    }

    if (remaining < 0) {
      return `${t('budgetingCard.results.deficit')}: ${t('common.currencySymbol')}${Math.abs(Number(remaining.toFixed(2)))}`;
    }

    return `${t('budgetingCard.results.remaining')}: ${t('common.currencySymbol')}${Number(remaining.toFixed(2))}`;
  };

  const handleCalculateBudget = () => {
    const i = parseFloat(income);
    const e = parseFloat(expenses);
    const s = savingsGoal ? parseFloat(savingsGoal) : null;

    if (!income || !expenses) {
      setResult(t('budgetingCard.errors.requiredValues'));
      return;
    }

    if (isNaN(i) || isNaN(e) || (s !== null && isNaN(s))) {
      setResult(t('budgetingCard.errors.invalidInput'));
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('budgetingCard.title')}
          icon={<BudgetingIcon size={50} color='#27AE60' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('budgetingCard.common.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('budgetingCard.placeholders.income')}
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
            placeholder={t('budgetingCard.placeholders.expenses')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={expenses}
            onChangeText={setExpenses}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('budgetingCard.placeholders.savingsGoal')}
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
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('budgetingCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
