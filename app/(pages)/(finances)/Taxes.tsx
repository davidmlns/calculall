import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { TaxesIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Taxes() {
  const [result, setResult] = useState('The result will appear here');
  const [income, setIncome] = useState('');
  const [taxRate, setTaxRate] = useState('');

  const calculateTax = (income: number, taxRate: number): string => {
    if (income <= 0 || taxRate <= 0) return 'Values must be positive';

    const taxAmount = income * (taxRate / 100);
    return `Tax Amount: $${Number(taxAmount.toFixed(2))}`;
  };

  const handleCalculateTax = () => {
    const i = parseFloat(income);
    const t = parseFloat(taxRate);

    if (!income || !taxRate) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(i) || isNaN(t)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateTax(i, t));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Taxes' icon={<TaxesIcon size={52} color='#27AE60' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Tax Calculator</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter tax rate (%)'
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
          <Pressable
            onPress={handleCalculateTax}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
