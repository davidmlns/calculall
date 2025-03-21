import { Pressable, ScrollView, Text, TextInput, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { RomanNumberIcon, ConvertIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function RomanNumber() {
  const [result, setResult] = useState('The result will appear here');
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const scaleValue = new Animated.Value(1);

  const handleRomanNumber = (num: number): string => {
    if (num <= 0 || num > 999999) return 'Number must be between 1 and 999999';
    const romanNumerals = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' },
    ];

    let roman = '';
    for (const { value, symbol } of romanNumerals) {
      while (num >= value) {
        roman += symbol;
        num -= value;
      }
    }
    return roman;
  };

  const handleConvert = () => {
    const num = parseFloat(valueTextInputValues);
    if (!valueTextInputValues) {
      setResult('Please enter a number');
      return;
    }
    if (isNaN(num)) {
      setResult('Invalid input');
      return;
    }
    setResult(handleRomanNumber(num));
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
        title='Roman numbers'
        icon={<RomanNumberIcon size={62} color='#6C3483' />}
      />

      <ResultComponent result={result} />

      <View className='mt-2 mx-auto'>
        <View className='flex-row items-center bg-gray-800 rounded-lg pr-3 pl-3 w-80 h-16'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder='Enter a number'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={setValueTextInputValues}
            maxLength={4}
          />
        </View>
      </View>

      <View className='mt-5'>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleConvert}
            className='rounded-2xl mx-auto mb-10'
            accessibilityLabel='Convert Button'>
            <ConvertIcon size={58} color='white' />
          </Pressable>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
