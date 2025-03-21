import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  ElectricalResistanceIcon,
  ElectricConsumptionIcon,
  CalculateIcon,
} from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function ElectricalResistance() {
  const [result, setResult] = useState('The result will appear here');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateResistance = (voltage: number, current: number): string => {
    if (voltage <= 0 || current <= 0) return 'Values must be positive';
    if (current === 0) return 'Current cannot be zero';

    const resistance = voltage / current;
    return `Resistance: ${Number(resistance.toFixed(4))} Ω`;
  };

  const handleCalculateResistance = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);

    if (!voltage || !current) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(v) || isNaN(i)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateResistance(v, i));
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
        title='Electrical Resistance'
        icon={<ElectricalResistanceIcon size={52} color='#3498DB' />}
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
      </View>

      {voltage && current && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateResistance}
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
