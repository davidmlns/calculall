import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ProbabilityIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Probability() {
  const [result, setResult] = useState('The result will appear here');
  const [valueATextInputValues, setValueATextInputValues] = useState('');
  const [valueBTextInputValues, setValueBTextInputValues] = useState('');

  const calculateProbability = () => {
    const favorable = parseFloat(valueATextInputValues);
    const total = parseFloat(valueBTextInputValues);

    if (!valueATextInputValues || !valueBTextInputValues) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(favorable) || isNaN(total)) {
      setResult('Invalid input values');
      return;
    }

    if (total <= 0 || favorable < 0) {
      setResult('Values must be positive');
      return;
    }

    if (favorable > total) {
      setResult('Favorable cases must be ≤ total');
      return;
    }

    const probability = ((favorable / total) * 100).toFixed(2);
    setResult(`The probability is ${probability}%`);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Probability'
        icon={<ProbabilityIcon size={58} color='#6C3483' />}
      />

      <ResultComponent result={result} />

      <View className='flex-row flex-wrap mt-2 mr-4 justify-center'>
        <View className='flex-col justify-center items-center w-full'>
          <View className='mt-2'>
            <View className='flex-row items-center bg-gray-800 rounded-lg pr-3 pl-3 w-96 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                <Text className='text-black font-semibold text-xl'>Favorable cases</Text>
              </View>
              <TextInput
                className='text-right text-2xl text-slate-300 flex-1'
                placeholder='0'
                placeholderTextColor='#cbd5e1'
                keyboardType='number-pad'
                value={valueATextInputValues}
                onChangeText={setValueATextInputValues}
                maxLength={9}
              />
            </View>
          </View>

          <View className='mt-2'>
            <View className='flex-row justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-96 h-16'>
              <View className='bg-icon-background rounded-lg p-1.5 px-3 ml-2'>
                <Text className='text-black font-semibold text-xl'>Total cases</Text>
              </View>
              <TextInput
                className='text-right text-2xl text-slate-300'
                placeholder='0'
                placeholderTextColor='#cbd5e1'
                keyboardType='number-pad'
                value={valueBTextInputValues}
                onChangeText={setValueBTextInputValues}
                maxLength={9}
              />
            </View>
          </View>
        </View>
      </View>

      <View>
        <Pressable
          onPress={calculateProbability}
          className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
          <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
