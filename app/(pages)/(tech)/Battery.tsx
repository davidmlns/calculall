import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { BatteryIcon } from '../../../components/Icons';
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

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Battery' icon={<BatteryIcon size={52} color='#3498DB' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
        <View>
          <Pressable
            onPress={handleCalculateBatteryLife}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
