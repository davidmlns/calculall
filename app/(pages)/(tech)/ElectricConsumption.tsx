import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ElectricConsumptionIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const scaleValue = new Animated.Value(1);

export default function ElectricConsumption() {
  const [result, setResult] = useState('The result will appear here');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [time, setTime] = useState('');

  const calculateConsumption = (voltage: number, current: number, time: number): string => {
    if (voltage <= 0 || current <= 0 || time <= 0) return 'Values must be positive';

    const power = voltage * current;
    const consumption = power * time;
    return `Consumption: ${Number(consumption.toFixed(4))} Wh`;
  };

  const handleCalculateConsumption = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const t = parseFloat(time);

    if (!voltage || !current || !time) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(v) || isNaN(i) || isNaN(t)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateConsumption(v, i, t));
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
        title='Electric Usage'
        icon={<ElectricConsumptionIcon size={51} color='#3498DB' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Voltage (V)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={voltage}
            onChangeText={setVoltage}
            maxLength={5}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Current (A)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={current}
            onChangeText={setCurrent}
            maxLength={3}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Time (h)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={time}
            onChangeText={setTime}
            maxLength={3}
          />
        </View>
      </View>

      {voltage && current && time && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateConsumption}
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
