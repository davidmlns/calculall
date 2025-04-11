import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CookingTimeIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CookingTime() {
  const { t } = useTranslation('');
  const [result, setResult] = useState(t('cookingTimeCard.defaultResult'));
  const [foodWeight, setFoodWeight] = useState('');
  const [cookingPower, setCookingPower] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateCookingTime = (weight: number, power: number): string => {
    if (weight <= 0 || power <= 0) return t('cookingTimeCard.positiveValuesRequired');

    // Basic cooking time formula: (weight in grams * 0.05) / power in watts
    const cookingTime = (weight * 0.05) / power;
    return t('cookingTimeCard.cookingTimeResult', { time: Number(cookingTime.toFixed(2)) });
  };

  const handleCalculateCookingTime = () => {
    const weight = parseFloat(foodWeight);
    const power = parseFloat(cookingPower);

    if (!foodWeight || !cookingPower) {
      setResult(t('cookingTimeCard.enterRequiredValues'));
      return;
    }

    if (isNaN(weight) || isNaN(power)) {
      setResult(t('cookingTimeCard.invalidInput'));
      return;
    }

    setResult(calculateCookingTime(weight, power));
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
          title={t('cookingTimeCard.title')}
          icon={<CookingTimeIcon size={52} color='#F39C12' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-90 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('cookingTimeCard.valuesTitle')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('cookingTimeCard.weightPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={foodWeight}
            onChangeText={setFoodWeight}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('cookingTimeCard.powerPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={cookingPower}
            onChangeText={setCookingPower}
            maxLength={5}
          />
        </View>
      </View>

      {foodWeight && cookingPower && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateCookingTime}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('cookingTimeCard.calculateButtonA11yLabel')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
