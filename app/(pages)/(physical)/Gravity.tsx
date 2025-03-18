import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ForceGravityIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const GRAVITATIONAL_CONSTANT = 6.6743e-11;

export default function Gravity() {
  const [result, setResult] = useState('The result will appear here');
  const [valueM1TextInputValues, setValueM1TextInputValues] = useState('');
  const [valueM2TextInputValues, setValueM2TextInputValues] = useState('');
  const [valueDistanceTextInputValues, setValueDistanceTextInputValues] = useState('');

  const handleCalculateGravity = () => {
    const m1 = parseFloat(valueM1TextInputValues);
    const m2 = parseFloat(valueM2TextInputValues);
    const distance = parseFloat(valueDistanceTextInputValues);

    if (!valueM1TextInputValues || !valueM2TextInputValues || !valueDistanceTextInputValues) {
      setResult('Please enter all values');
      return;
    }

    if (isNaN(m1) || isNaN(m2) || isNaN(distance)) {
      setResult('Invalid input values');
      return;
    }

    if (m1 < 0 || m2 < 0 || distance <= 0) {
      setResult('Values must be positive');
      return;
    }

    const force = (m1 * m2 * GRAVITATIONAL_CONSTANT) / (distance * distance);
    setResult(`Fg = ${force.toExponential(2)} N`);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Gravity'
        icon={<ForceGravityIcon size={58} color='#2E86C1' />}
      />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter mass 1 (kg)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueM1TextInputValues}
            onChangeText={setValueM1TextInputValues}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter mass 2 (kg)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueM2TextInputValues}
            onChangeText={setValueM2TextInputValues}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter distance (m)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueDistanceTextInputValues}
            onChangeText={setValueDistanceTextInputValues}
            maxLength={9}
          />
        </View>
      </View>

      {valueM1TextInputValues && valueM2TextInputValues && valueDistanceTextInputValues && (
        <View>
          <Pressable
            onPress={handleCalculateGravity}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
