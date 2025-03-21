import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CookingTimeIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function CookingTime() {
  const [result, setResult] = useState('The result will appear here');
  const [foodWeight, setFoodWeight] = useState('');
  const [cookingPower, setCookingPower] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateCookingTime = (weight: number, power: number): string => {
    if (weight <= 0 || power <= 0) return 'Values must be positive';

    // Basic cooking time formula: (weight in grams * 0.05) / power in watts
    const cookingTime = (weight * 0.05) / power;
    return `Cooking Time: ${Number(cookingTime.toFixed(2))} hours`;
  };

  const handleCalculateCookingTime = () => {
    const weight = parseFloat(foodWeight);
    const power = parseFloat(cookingPower);

    if (!foodWeight || !cookingPower) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(weight) || isNaN(power)) {
      setResult('Invalid input values');
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
      <HeaderDescriptionPage
        title='Cooking Time'
        icon={<CookingTimeIcon size={52} color='#F39C12' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Food Weight (grams)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={foodWeight}
            onChangeText={setFoodWeight}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Cooking Power (watts)'
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
                accessibilityLabel='Calculate Button'>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
