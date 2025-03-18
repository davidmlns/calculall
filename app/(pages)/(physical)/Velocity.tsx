import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { VelocityIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Velocity() {
  const [result, setResult] = useState('The result will appear here');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');

  const calculateVelocity = (distance: number, time: number): string => {
    if (isNaN(distance) || distance <= 0) return 'Distance must be positive';
    if (isNaN(time) || time <= 0) return 'Time must be positive';
    return `${(distance / time).toFixed(2)} m/s`;
  };

  const handleCalculateVelocity = () => {
    const dist = parseFloat(distance);
    const t = parseFloat(time);
    if (isNaN(dist) || isNaN(t)) {
      setResult('Provide all values');
      return;
    }
    setResult(calculateVelocity(dist, t));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Velocity' icon={<VelocityIcon size={58} color='#2E86C1' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter distance (m)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distance}
            onChangeText={text => setDistance(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter time (s)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={time}
            onChangeText={text => setTime(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
      </View>

      {distance && time && (
        <View>
          <Pressable
            onPress={handleCalculateVelocity}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
