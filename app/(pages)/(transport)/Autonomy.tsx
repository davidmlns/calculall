import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { AutonomyIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Autonomy() {
  const [result, setResult] = useState('The result will appear here');
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [energyConsumption, setEnergyConsumption] = useState('');

  const calculateRange = (capacity: number, consumption: number): string => {
    if (capacity <= 0 || consumption <= 0) return 'Values must be positive';

    const range = (capacity / consumption) * 100;
    return `Estimated: ${Number(range.toFixed(2))} km`;
  };

  const handleCalculateRange = () => {
    const capacity = parseFloat(batteryCapacity);
    const consumption = parseFloat(energyConsumption);

    if (!batteryCapacity || !energyConsumption) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(capacity) || isNaN(consumption)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateRange(capacity, consumption));
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
      <HeaderDescriptionPage title='Autonomy' icon={<AutonomyIcon size={51} color='#7F8C8D' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-full text-slate-300'
            placeholder='Battery Capacity (kWh)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={batteryCapacity}
            onChangeText={setBatteryCapacity}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-full text-slate-300'
            placeholder='Energy Consumption (kWh/100km)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={energyConsumption}
            onChangeText={setEnergyConsumption}
            maxLength={5}
          />
        </View>
      </View>

      {batteryCapacity && energyConsumption && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateRange}
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
