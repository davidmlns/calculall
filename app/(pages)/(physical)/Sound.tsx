import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { SoundIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Sound() {
  const [result, setResult] = useState('The result will appear here');
  const [soundPressure, setSoundPressure] = useState('');
  const [distance, setDistance] = useState('');

  const calculateSoundIntensity = (pressure: number, distance: number): string => {
    const AIR_DENSITY = 1.225;
    const SPEED_OF_SOUND = 343;
    const REFERENCE_INTENSITY = 1e-12;

    if (pressure <= 0 || distance <= 0) return 'Values must be positive';

    const intensity = pressure ** 2 / (2 * AIR_DENSITY * SPEED_OF_SOUND);
    const dB = 10 * Math.log10(intensity / REFERENCE_INTENSITY);

    return `${Math.round(dB * 100) / 100} dB`;
  };

  const handleCalculateSoundIntensity = () => {
    const pressure = parseFloat(soundPressure);
    const dist = parseFloat(distance);

    if (!soundPressure || !distance) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(pressure) || isNaN(dist)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateSoundIntensity(pressure, dist));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Sound' icon={<SoundIcon size={58} color='#2E86C1' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter sound pressure (Pa)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={soundPressure}
            onChangeText={setSoundPressure}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter distance (m)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distance}
            onChangeText={setDistance}
            maxLength={9}
          />
        </View>
      </View>

      {soundPressure && distance && (
        <View>
          <Pressable
            onPress={handleCalculateSoundIntensity}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
