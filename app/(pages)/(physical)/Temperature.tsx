import { Pressable, ScrollView, Text, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { TemperatureIcon, CalculateIcon, DeleteIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '@/components/ConvertComponent';

const scaleValue = new Animated.Value(1);

export default function Temperature() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');
  const [activeUnit, setActiveUnit] = useState('C');

  const clearInputs = () => {
    setCelsius('');
    setFahrenheit('');
    setKelvin('');
  };

  const convertTemperature = (value: string, unit: string) => {
    setActiveUnit(unit);
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue) || 0;
    if (isNaN(numericValue)) return;
    let c = 0,
      f = 0,
      k = 0;

    if (unit === 'C') {
      c = numericValue;
      f = (c * 9) / 5 + 32;
      k = c + 273.15;
    } else if (unit === 'F') {
      f = numericValue;
      c = ((f - 32) * 5) / 9;
      k = c + 273.15;
    } else if (unit === 'K') {
      k = numericValue;
      c = k - 273.15;
      f = (c * 9) / 5 + 32;
    }

    setCelsius(unit === 'C' ? cleanedValue : c.toFixed(2));
    setFahrenheit(unit === 'F' ? cleanedValue : f.toFixed(2));
    setKelvin(unit === 'K' ? cleanedValue : k.toFixed(2));
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
        title='Temperature'
        icon={<TemperatureIcon size={54} color='#2E86C1' />}
      />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='C'
          title='Celsius'
          description='°C'
          onChangeText={value => convertTemperature(value, 'C')}
          value={celsius}
          isActive={activeUnit === 'C'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='F'
          title='Fahrenheit'
          description='°F'
          onChangeText={value => convertTemperature(value, 'F')}
          value={fahrenheit}
          isActive={activeUnit === 'F'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='K'
          title='Kelvin'
          description='K'
          onChangeText={value => convertTemperature(value, 'K')}
          value={kelvin}
          isActive={activeUnit === 'K'}
          onPress={clearInputs}
          maxLength={9}
        />
      </View>

      {celsius && fahrenheit && kelvin && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={clearInputs}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel='Clear Button'>
              <DeleteIcon size={48} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
