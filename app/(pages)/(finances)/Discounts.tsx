import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DiscountsIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const scaleValue = new Animated.Value(1);

export default function Discounts() {
  const [result, setResult] = useState('The result will appear here');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  const calculateDiscount = (originalPrice: number, discountPercentage: number): string => {
    if (originalPrice <= 0 || discountPercentage <= 0) return 'Values must be positive';
    if (discountPercentage >= 100) return 'Discount < 100%';

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

  const handleDiscountChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue === '') {
      setDiscountPercentage('');
    } else {
      const value = Math.min(100, Math.max(0, parseInt(numericValue, 10)));
      setDiscountPercentage(value.toString());
    }
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
      <HeaderDescriptionPage title='Discounts' icon={<DiscountsIcon size={50} color='#27AE60' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
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
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter discount (%)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={discountPercentage}
            onChangeText={handleDiscountChange}
            maxLength={3}
          />
        </View>
      </View>

      {originalPrice && discountPercentage && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateDiscount}
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
