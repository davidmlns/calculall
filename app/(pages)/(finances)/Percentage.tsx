import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { PercentageIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Percentage() {
  const [result, setResult] = useState('The result will appear here');
  const [baseValue, setBaseValue] = useState('');
  const [percentage, setPercentage] = useState('');

  const calculatePercentage = (baseValue: number, percentage: number): string => {
    if (baseValue <= 0 || percentage <= 0) return 'Values must be positive';

    const calculatedValue = baseValue * (percentage / 100);
    return `Calculated Value: $${Number(calculatedValue.toFixed(2))}`;
  };

  const handleCalculatePercentage = () => {
    const b = parseFloat(baseValue);
    const p = parseFloat(percentage);

    if (!baseValue || !percentage) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(b) || isNaN(p)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculatePercentage(b, p));
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
      <HeaderDescriptionPage
        title='Percentage'
        icon={<PercentageIcon size={50} color='#27AE60' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter base value ($)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={baseValue}
            onChangeText={setBaseValue}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter percentage (%)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={percentage}
            onChangeText={setPercentage}
            maxLength={3}
          />
        </View>
      </View>

      {baseValue && percentage && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculatePercentage}
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
