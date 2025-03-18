import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ElectricalResistanceIcon, ElectricConsumptionIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function ElectricalResistance() {
  const [result, setResult] = useState('The result will appear here');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');

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
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
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
          <Pressable
            onPress={handleCalculateResistance}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
