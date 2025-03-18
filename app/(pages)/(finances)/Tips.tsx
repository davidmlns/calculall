import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { TipIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Tips() {
  const [result, setResult] = useState('The result will appear here');
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');

  const calculateTip = (billAmount: number, tipPercentage: number): string => {
    if (billAmount <= 0 || tipPercentage <= 0) return 'Values must be positive';

    const tipAmount = billAmount * (tipPercentage / 100);
    return `Tip Amount: $${Number(tipAmount.toFixed(2))}`;
  };

  const handleCalculateTip = () => {
    const b = parseFloat(billAmount);
    const p = parseFloat(tipPercentage);

    if (!billAmount || !tipPercentage) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(b) || isNaN(p)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateTip(b, p));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Tips' icon={<TipIcon size={52} color='#27AE60' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Tip Calculator</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter bill amount ($)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={billAmount}
            onChangeText={setBillAmount}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter tip percentage (%)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={tipPercentage}
            onChangeText={setTipPercentage}
            maxLength={5}
          />
        </View>
      </View>

      {billAmount && tipPercentage && (
        <View>
          <Pressable
            onPress={handleCalculateTip}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
