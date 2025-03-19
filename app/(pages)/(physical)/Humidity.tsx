import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { HumidityIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';

type HumidityOperation = 'rel-hum' | 'abs-hum';

const operations: Operation[] = [
  {
    id: 'rel-hum',
    title: 'Relative Humidity',
    icon: <HumidityIcon size={32} color='#2E86C1' />,
    description: '100%',
  },
  {
    id: 'abs-hum',
    title: 'Absolute Humidity',
    icon: <HumidityIcon size={32} color='#2E86C1' />,
    description: '100%',
  },
];

const calculateSaturationVaporPressure = (temperature: number) => {
  return 6.112 * Math.exp((17.67 * temperature) / (temperature + 243.5));
};

export default function Humidity() {
  const [result, setResult] = useState('The result will appear here');
  const [selectedOperation, setSelectedOperation] = useState<HumidityOperation>('rel-hum');
  const [valueDewPointTextInputValues, setValueDewPointTextInputValues] = useState('');
  const [valueTemperatureTextInputValues, setValueTemperatureTextInputValues] = useState('');
  const [valueRHTextInputValues, setValueRHTextInputValues] = useState('');

  const handleCalculate = (selectedOperation: HumidityOperation) => {
    const T = parseFloat(valueTemperatureTextInputValues);

    if (!valueTemperatureTextInputValues) {
      setResult('Please enter temperature');
      return;
    }

    if (isNaN(T)) {
      setResult('Invalid temperature value');
      return;
    }

    switch (selectedOperation) {
      case 'rel-hum': {
        const Td = parseFloat(valueDewPointTextInputValues);
        if (isNaN(Td)) {
          setResult('Invalid dew point value');
          return;
        }
        const es = calculateSaturationVaporPressure(T);
        const e = calculateSaturationVaporPressure(Td);
        const RH = (e / es) * 100;
        setResult(`Relative Humidity: ${RH.toFixed(2)}%`);
        break;
      }
      case 'abs-hum': {
        const RH = parseFloat(valueRHTextInputValues);
        if (isNaN(RH)) {
          setResult('Invalid humidity value');
          return;
        }
        const es = calculateSaturationVaporPressure(T);
        const e = (RH / 100) * es;
        const absHum = (e * 0.000622) / (T + 273.15);
        setResult(`Absolute Humidity: ${absHum.toFixed(2)} kg/m³`);
        break;
      }
    }
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Humidity' icon={<HumidityIcon size={58} color='#2E86C1' />} />
      <ResultComponent result={result} />
      <CalculateComponent
        operations={operations}
        onCalculate={handleCalculate}
        onSendOperation={setSelectedOperation}
      />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter temperature (°C)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTemperatureTextInputValues}
            onChangeText={setValueTemperatureTextInputValues}
            maxLength={9}
          />
        </View>
        {selectedOperation === 'rel-hum' && (
          <View className='mt-4'>
            <TextInput
              className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
              placeholder='Enter dew point (°C)'
              placeholderTextColor='#cbd5e1'
              keyboardType='number-pad'
              value={valueDewPointTextInputValues}
              onChangeText={setValueDewPointTextInputValues}
              maxLength={9}
            />
          </View>
        )}
        {selectedOperation === 'abs-hum' && (
          <View className='mt-4'>
            <TextInput
              className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
              placeholder='Enter relative humidity'
              placeholderTextColor='#cbd5e1'
              keyboardType='number-pad'
              value={valueRHTextInputValues}
              onChangeText={setValueRHTextInputValues}
              maxLength={6}
            />
          </View>
        )}
      </View>

      {valueTemperatureTextInputValues && (
        <View>
          <Pressable
            onPress={() => handleCalculate(selectedOperation)}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
