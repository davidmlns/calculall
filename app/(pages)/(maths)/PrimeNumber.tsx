import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CorrectIcon, IncorrectIcon, NextIcon, PrimeNumberIcon } from '../../../components/Icons';
import { useState } from 'react';

const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const getNextPrime = (n: number): number => {
  let next = n + 1;
  while (!isPrime(next)) {
    next++;
  }
  return next;
};

export default function PrimeNumber() {
  const [result, setResult] = useState('');
  const [nextPrime, setNextPrime] = useState('');
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [resultIcon, setResultIcon] = useState<JSX.Element | null>(null);

  const handleTextInputChange = (text: string) => {
    const number = parseFloat(text);

    if (isNaN(number)) {
      setResult('Invalid input');
      setNextPrime('');
      setResultIcon(null);
      return;
    }

    if (isPrime(number)) {
      setResultIcon(<CorrectIcon size={32} color='#FED900' />);
      setResult(`Is prime`);
    } else {
      setResultIcon(<IncorrectIcon size={32} color='#FF0000' />);
      setResult(`Is not prime`);
    }
    setNextPrime(getNextPrime(number).toString());
  };

  const handleInputChange = (text: string, setValue: (value: string) => void) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const numericValue = Math.min(parseFloat(numericText), 999999);
    setValue(isNaN(numericValue) ? '' : numericValue.toString());
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Prime numbers'
        icon={<PrimeNumberIcon size={58} color='#6C3483' />}
      />

      <View className='flex-row justify-around'>
        <View className='flex-row justify-between items-center bg-gray-800 rounded-lg px-2 w-48 h-14'>
          <View className='rounded-lg p-1 px-2'>{resultIcon}</View>
          <TextInput
            className='text-right text-xl text-slate-300'
            placeholder='Is prime number?'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={result}
            editable={false}
          />
        </View>

        <View className='flex-row justify-between items-center bg-gray-800 rounded-lg px-2 w-48 h-14'>
          <View className='rounded-lg p-1 px-2'>
            <NextIcon size={32} color='#6C3483' />
          </View>
          <TextInput
            className='text-right text-xl text-slate-300'
            placeholder='Next'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={nextPrime}
            editable={false}
          />
        </View>
      </View>

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Value</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter value'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={text => handleInputChange(text, setValueTextInputValues)}
            maxLength={6}
          />
        </View>
      </View>

      {valueTextInputValues && (
        <View>
          <Pressable
            onPress={() => handleTextInputChange(valueTextInputValues)}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Verify</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
