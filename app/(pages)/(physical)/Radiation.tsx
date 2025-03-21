import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { RadiationIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const scaleValue = new Animated.Value(1);

export default function Radiation() {
  const [result, setResult] = useState('The result will appear here');
  const [powerValue, setPowerValue] = useState('');
  const [areaValue, setAreaValue] = useState('');

  const calculateRadiation = (power: number, area: number): string => {
    if (power <= 0 || area <= 0) return 'Values must be positive';
    return `I = ${(power / area).toFixed(2)} W/m²`;
  };

  const handleCalculateRadiation = () => {
    const power = parseFloat(powerValue);
    const area = parseFloat(areaValue);

    if (!powerValue || !areaValue) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(power) || isNaN(area)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateRadiation(power, area));
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
      <HeaderDescriptionPage title='Radiation' icon={<RadiationIcon size={56} color='#2E86C1' />} />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter power (W)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={powerValue}
            onChangeText={setPowerValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter area (m²)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={areaValue}
            onChangeText={setAreaValue}
            maxLength={9}
          />
        </View>
      </View>

      {powerValue && areaValue && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateRadiation}
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
