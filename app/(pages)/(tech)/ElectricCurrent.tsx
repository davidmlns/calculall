import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ElectricCurrentIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function ElectricCurrent() {
  const [result, setResult] = useState('The result will appear here');
  const [voltage, setVoltage] = useState('');
  const [resistance, setResistance] = useState('');

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

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Electric Current'
        icon={<ElectricCurrentIcon size={52} color='#3498DB' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
          <Pressable
            onPress={handleCalculateCurrent}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
