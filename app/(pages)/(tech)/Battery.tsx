import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { BatteryIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Battery() {
  const [result, setResult] = useState('The result will appear here');
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [currentDraw, setCurrentDraw] = useState('');

  const calculateBatteryLife = (capacity: number, current: number): string => {
    if (capacity <= 0 || current <= 0) return 'Values must be positive';

    const batteryLife = capacity / current;
    return `Battery Life: ${Number(batteryLife.toFixed(2))} hours`;
  };

  const handleCalculateBatteryLife = () => {
    const capacity = parseFloat(batteryCapacity);
    const current = parseFloat(currentDraw);

    if (!batteryCapacity || !currentDraw) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(capacity) || isNaN(current)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateBatteryLife(capacity, current));
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
      <HeaderDescriptionPage title='Battery' icon={<BatteryIcon size={52} color='#3498DB' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Battery Capacity (mAh)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={batteryCapacity}
            onChangeText={setBatteryCapacity}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Current Draw (mA)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={currentDraw}
            onChangeText={setCurrentDraw}
            maxLength={5}
          />
        </View>
      </View>

      {batteryCapacity && currentDraw && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateBatteryLife}
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
