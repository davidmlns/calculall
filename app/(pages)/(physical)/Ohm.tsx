import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { OhmIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const PERMEABILITY = 4 * Math.PI * 1e-7;

const calculateMagneticField = (current: number, distance: number): string => {
  return ((PERMEABILITY * current) / (2 * Math.PI * distance)).toExponential(2);
};

export default function Ohm() {
  const [result, setResult] = useState('The result will appear here');
  const [currentValue, setCurrentValue] = useState('');
  const [distanceValue, setDistanceValue] = useState('');
  const scaleValue = new Animated.Value(1);

  const handleCalculateMagnetism = () => {
    const current = parseFloat(currentValue);
    const distance = parseFloat(distanceValue);

    if (!currentValue || !distanceValue) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(current) || isNaN(distance)) {
      setResult('Invalid input values');
      return;
    }

    if (current < 0 || distance <= 0) {
      setResult('Values must be positive');
      return;
    }

    const magneticField = calculateMagneticField(current, distance);
    setResult(`B = ${magneticField} T`);
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
      <HeaderDescriptionPage title='Ohm' icon={<OhmIcon size={50} color='#2E86C1' />} />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter current'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={currentValue}
            onChangeText={setCurrentValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter distance'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distanceValue}
            onChangeText={setDistanceValue}
            maxLength={9}
          />
        </View>
      </View>

      {currentValue && distanceValue && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateMagnetism}
              className=' rounded-2xl mx-auto mb-10'
              accessibilityLabel='Calculate Button'>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
