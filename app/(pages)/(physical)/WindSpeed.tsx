import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { WindSpeedIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function WindSpeed() {
  const [result, setResult] = useState('The result will appear here');
  const [pressure, setPressure] = useState('');
  const [airDensity, setAirDensity] = useState('1.225');

  const calculateWindSpeed = (pressure: number, airDensity: number): string => {
    if (isNaN(pressure) || pressure <= 0) return 'Pressure must be positive';
    if (isNaN(airDensity) || airDensity <= 0) return 'Air density must be positive';
    return `${Math.sqrt((2 * pressure) / airDensity).toFixed(2)} m/s`;
  };

  const handleCalculateWindSpeed = () => {
    const p = parseFloat(pressure);
    const density = parseFloat(airDensity);
    if (isNaN(p) || isNaN(density)) {
      setResult('Provide all values');
      return;
    }
    setResult(calculateWindSpeed(p, density));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Wind Speed'
        icon={<WindSpeedIcon size={58} color='#2E86C1' />}
      />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter pressure (Pa)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={pressure}
            onChangeText={text => setPressure(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter air density (kg/m³)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={airDensity}
            onChangeText={text => setAirDensity(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
      </View>

      {pressure && airDensity && (
        <View>
          <Pressable
            onPress={handleCalculateWindSpeed}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
