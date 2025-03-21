import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { InterestIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const scaleValue = new Animated.Value(1);

export default function Interests() {
  const [result, setResult] = useState('The result will appear here');
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [time, setTime] = useState('');

  const calculateInterest = (principal: number, interestRate: number, time: number): string => {
    if (principal <= 0 || interestRate <= 0 || time <= 0) return 'Values must be positive';

    const amount = principal * Math.pow(1 + interestRate / 100, time);
    const interestEarned = amount - principal;
    return `Total Amount: $${Number(amount.toFixed(2))}`;
  };

  const handleCalculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate);
    const t = parseFloat(time);

    if (!principal || !interestRate || !time) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateInterest(p, r, t));
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
      <HeaderDescriptionPage title='Interests' icon={<InterestIcon size={50} color='#27AE60' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter principal ($)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={principal}
            onChangeText={setPrincipal}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter interest rate (%)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={interestRate}
            onChangeText={setInterestRate}
            maxLength={5}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter time (years)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={time}
            onChangeText={setTime}
            maxLength={3}
          />
        </View>
      </View>

      {principal && interestRate && time && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateInterest}
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
