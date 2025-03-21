import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { WavelengthIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const scaleValue = new Animated.Value(1);

export default function Wavelength() {
  const [result, setResult] = useState('The result will appear here');
  const [velocity, setVelocity] = useState('');
  const [frequency, setFrequency] = useState('');

  const calculateWavelength = (velocity: number, frequency: number): string => {
    if (isNaN(velocity) || velocity <= 0) return 'Velocity must be positive';
    if (isNaN(frequency) || frequency <= 0) return 'Frequency must be positive';
    return `${(velocity / frequency).toFixed(2)} m`;
  };

  const handleCalculateWavelength = () => {
    const v = parseFloat(velocity);
    const f = parseFloat(frequency);
    if (isNaN(v) || isNaN(f)) {
      setResult('Provide all values');
      return;
    }
    setResult(calculateWavelength(v, f));
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
        title='Wavelength'
        icon={<WavelengthIcon size={52} color='#2E86C1' />}
      />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter velocity (m/s)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={velocity}
            onChangeText={text => setVelocity(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter frequency (Hz)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={frequency}
            onChangeText={text => setFrequency(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
      </View>

      {velocity && frequency && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateWavelength}
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
