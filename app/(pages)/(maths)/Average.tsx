import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import HeaderPages from '../../../components/HeaderPages';
import { AverageIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '@/components/ResultComponent';
import { useState } from 'react';

export default function Average() {
  const [result, setResult] = useState('');
  const [valuesVisibles, setValuesVisibles] = useState(false);
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [error, setError] = useState('');
  const scaleValue = new Animated.Value(1);

  const handleCalculate = () => {
    if (!valueTextInputValues) {
      setError('Please enter the number of values');
      return;
    }
    if (values.length === 0) {
      setError('Please enter all values');
      return;
    }
    const valuesArray = values.map(value => parseFloat(value.trim()));
    const sum = valuesArray.reduce((acc, value) => acc + value, 0);
    const average = sum / valuesArray.length;
    setResult(`Average: ${average}`);
    setError('');
  };

  const handleValueChange = (index: number, text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const numericValue = Math.min(parseFloat(numericText), 999999);
    if (!isNaN(numericValue)) {
      const newValues = [...values];
      newValues[index] = numericValue.toString();
      setValues(newValues);
    } else {
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);
    }
  };

  const handleNumberOfValuesChange = (text: string) => {
    if (text === '') {
      setValueTextInputValues('');
      setValuesVisibles(false);
      setValues([]);
    }
    const numericValue = parseInt(text, 10);
    if (numericValue === 0) {
      setValuesVisibles(false);
      setValues([]);
    }
    if (!isNaN(numericValue) && numericValue <= 30) {
      setValueTextInputValues(text);
    }
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

  const handleSubmitEditing = () => {
    if (valueTextInputValues !== '') setValuesVisibles(true);
    if (valueTextInputValues === '') setValuesVisibles(false);
    if (parseInt(valueTextInputValues, 10) === 0) setValuesVisibles(false);
    setValues([]);
  };

  const handleBlur = () => {
    if (valueTextInputValues !== '') setValuesVisibles(true);
    if (valueTextInputValues === '') setValuesVisibles(false);
    if (parseInt(valueTextInputValues, 10) === 0) setValuesVisibles(false);
    setValues([]);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full' accessibilityLabel='Average Calculator'>
      <HeaderPages />
      <HeaderDescriptionPage title='Average' icon={<AverageIcon size={58} color='#6C3483' />} />

      <ResultComponent result={result} error={error} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2 mx-auto'>
          <TextInput
            className='bg-gray-800 mx-auto rounded-2xl p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='How many values? Limit(30)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues.toString()}
            onChangeText={handleNumberOfValuesChange}
            onSubmitEditing={handleSubmitEditing}
            onBlur={handleBlur}
            accessibilityLabel='Number of values input'
          />
        </View>

        {valuesVisibles && (
          <View className='flex mt-6 flex-row flex-wrap justify-around'>
            {Array.from({ length: parseInt(valueTextInputValues, 10) }, (_, index) => (
              <View key={index} className='flex-row items-center mb-4'>
                <Text className='text-slate-300 mr-2 text-xl font-semibold'>Nro {index + 1}:</Text>
                <TextInput
                  className='bg-gray-800 rounded-lg p-2 text-center text-xl w-32 text-slate-300'
                  placeholder='Enter Nro'
                  placeholderTextColor='#cbd5e1'
                  keyboardType='numeric'
                  value={values[index] || ''}
                  onChangeText={text => handleValueChange(index, text)}
                  accessibilityLabel={`Value ${index + 1} input`}
                  maxLength={9}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      {valuesVisibles && (
        <View className=''>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculate}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel='Calculate Button'>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
