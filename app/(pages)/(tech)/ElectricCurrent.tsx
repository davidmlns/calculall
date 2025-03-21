import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ElectricCurrentIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function ElectricCurrent() {
  const [result, setResult] = useState('The result will appear here');
  const [voltage, setVoltage] = useState('');
  const [resistance, setResistance] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateCurrent = (voltage: number, resistance: number): string => {
    if (voltage <= 0 || resistance <= 0) return 'Values must be positive';
    if (resistance === 0) return 'Resistance cannot be zero';

    const current = voltage / resistance;
    return `Current: ${Number(current.toFixed(4))} A`;
  };

  const handleCalculateCurrent = () => {
    const v = parseFloat(voltage);
    const r = parseFloat(resistance);

    if (!voltage || !resistance) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(v) || isNaN(r)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateCurrent(v, r));
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
        title='Electric Current'
        icon={<ElectricCurrentIcon size={51} color='#3498DB' />}
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
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Resistance (Ω)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={resistance}
            onChangeText={setResistance}
            maxLength={5}
          />
        </View>
      </View>

      {voltage && resistance && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateCurrent}
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
