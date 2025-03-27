import { Pressable, ScrollView, Text, TextInput, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  CorrectIcon,
  IncorrectIcon,
  NextIcon,
  PrimeNumberIcon,
  VerifyIcon,
} from '../../../components/Icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [result, setResult] = useState('');
  const [nextPrime, setNextPrime] = useState('');
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [resultIcon, setResultIcon] = useState<JSX.Element | null>(null);
  const scaleValue = new Animated.Value(1);

  const handleTextInputChange = (text: string) => {
    const number = parseFloat(text);

    if (isNaN(number)) {
      setResult(t('primeNumberCard.invalidInput'));
      setNextPrime('');
      setResultIcon(null);
      return;
    }

    if (isPrime(number)) {
      setResultIcon(<CorrectIcon size={32} color='#FED900' />);
      setResult(t('primeNumberCard.isPrime'));
    } else {
      setResultIcon(<IncorrectIcon size={32} color='#FF0000' />);
      setResult(t('primeNumberCard.notPrime'));
    }
    setNextPrime(getNextPrime(number).toString());
  };

  const handleInputChange = (text: string, setValue: (value: string) => void) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const numericValue = Math.min(parseFloat(numericText), 999999);
    setValue(isNaN(numericValue) ? '' : numericValue.toString());
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
        title={t('primeNumberCard.title')}
        icon={<PrimeNumberIcon size={54} color='#6C3483' />}
      />

      <View className='flex-row justify-around'>
        <View className='flex-row justify-between items-center bg-gray-800 rounded-lg px-2 w-52 h-14'>
          <View className='rounded-lg p-1 px-2'>{resultIcon}</View>
          <TextInput
            className='text-right text-xl text-slate-300'
            placeholder={t('primeNumberCard.isPrimePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={result}
            editable={false}
          />
        </View>

        <View className='flex-row justify-between items-center bg-gray-800 rounded-lg px-2 w-52 h-14'>
          <View className='rounded-lg p-1 px-2'>
            <NextIcon size={32} color='#6C3483' />
          </View>
          <TextInput
            className='text-right text-xl text-slate-300'
            placeholder={t('primeNumberCard.nextPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={nextPrime}
            editable={false}
          />
        </View>
      </View>

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('primeNumberCard.value')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('primeNumberCard.enterValue')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={text => handleInputChange(text, setValueTextInputValues)}
            maxLength={6}
          />
        </View>
      </View>

      {valueTextInputValues && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => handleTextInputChange(valueTextInputValues)}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('primeNumberCard.verifyButton')}>
              <VerifyIcon size={44} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
