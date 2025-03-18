import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DiscountsIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Discounts() {
  const [result, setResult] = useState('The result will appear here');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  const calculateDiscount = (originalPrice: number, discountPercentage: number): string => {
    if (originalPrice <= 0 || discountPercentage <= 0) return 'Values must be positive';
    if (discountPercentage >= 100) return 'Discount must be less than 100%';

    const discountAmount = originalPrice * (discountPercentage / 100);
    const finalPrice = originalPrice - discountAmount;

    return `Final Price: $${Number(finalPrice.toFixed(2))}`;
  };

  const handleCalculateDiscount = () => {
    const p = parseFloat(originalPrice);
    const d = parseFloat(discountPercentage);

    if (!originalPrice || !discountPercentage) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(p) || isNaN(d)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateDiscount(p, d));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Discounts' icon={<DiscountsIcon size={52} color='#27AE60' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          Discount Calculator
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter original price ($)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={originalPrice}
            onChangeText={setOriginalPrice}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter discount (%)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={discountPercentage}
            onChangeText={setDiscountPercentage}
            maxLength={5}
          />
        </View>
      </View>

      {originalPrice && discountPercentage && (
        <View>
          <Pressable
            onPress={handleCalculateDiscount}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
