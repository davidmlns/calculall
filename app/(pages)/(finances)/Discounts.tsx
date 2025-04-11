import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DiscountsIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Discounts() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('discountsCard.resultPlaceholder'));
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  const calculateDiscount = (originalPrice: number, discountPercentage: number): string => {
    if (originalPrice <= 0 || discountPercentage <= 0)
      return t('discountsCard.errors.positiveValues');
    if (discountPercentage >= 100) return t('discountsCard.errors.discountLimit');

    const discountAmount = originalPrice * (discountPercentage / 100);
    const finalPrice = originalPrice - discountAmount;

    return `${t('discountsCard.results.finalPrice')}: ${t('common.currencySymbol')}${Number(finalPrice.toFixed(2))}`;
  };

  const handleCalculateDiscount = () => {
    const p = parseFloat(originalPrice);
    const d = parseFloat(discountPercentage);

    if (!originalPrice || !discountPercentage) {
      setResult(t('discountsCard.errors.requiredValues'));
      return;
    }

    if (isNaN(p) || isNaN(d)) {
      setResult(t('discountsCard.errors.invalidInput'));
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('discountsCard.title')}
          icon={<DiscountsIcon size={50} color='#27AE60' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('discountsCard.common.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('discountsCard.placeholders.originalPrice')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={originalPrice}
            onChangeText={setOriginalPrice}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('discountsCard.placeholders.discountPercentage')}
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
              accessibilityLabel={t('discountsCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
