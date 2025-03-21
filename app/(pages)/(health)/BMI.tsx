import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { BMIIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const scaleValue = new Animated.Value(1);

export default function BMI() {
  const [result, setResult] = useState('The result will appear here');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const calculateBMI = (weight: number, height: number): string => {
    if (weight <= 0 || height <= 0) return 'Values must be positive';

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    return `${Math.round(bmi * 100) / 100}`;
  };

  const getBMIClassification = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
    return 'Obesity';
  };

  const handleCalculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!weight || !height) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(w) || isNaN(h)) {
      setResult('Invalid input values');
      return;
    }

    const bmi = calculateBMI(w, h);
    const classification = getBMIClassification(parseFloat(bmi));
    setResult(`${bmi} (${classification})`);
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
      <HeaderDescriptionPage title='BMI' icon={<BMIIcon size={50} color='#E74C3C' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter weight (kg)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={weight}
            onChangeText={setWeight}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter height (cm)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={height}
            onChangeText={setHeight}
            maxLength={9}
          />
        </View>
      </View>

      {weight && height && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateBMI}
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
