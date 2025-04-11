import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import HeaderPages from '../../../components/HeaderPages';
import { AverageIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '@/components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Average() {
  const [result, setResult] = useState('');
  const [valuesVisibles, setValuesVisibles] = useState(false);
  const [valueTextInputValues, setValueTextInputValues] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [error, setError] = useState('');
  const scaleValue = new Animated.Value(1);
  const { t } = useTranslation();

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
    setResult(`${t('averageCard.title')}: ${average}`);
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

      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('averageCard.title')}
          icon={<AverageIcon size={58} color='#6C3483' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} error={error} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center font-Satoshi mb-2'>
          Values
        </Text>

        <View className='w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 mx-auto rounded-2xl p-4 mb-4 text-center text-2xl w-full text-slate-300 font-Satoshi'
            placeholder={t('averageCard.placeholderValue')}
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
          <View className='flex mt-4 flex-row flex-wrap justify-around font-Satoshi'>
            {Array.from({ length: parseInt(valueTextInputValues, 10) }, (_, index) => (
              <View key={index} className='flex-row items-center mb-4'>
                <Text className='text-slate-300 w-20 mr-4 text-xl font-semibold font-Satoshi'>
                  {t('averageCard.number')} {index + 1}:
                </Text>
                <TextInput
                  className='bg-gray-800 rounded-lg p-2 text-center text-xl w-28 text-slate-300 font-Satoshi'
                  placeholder={t('averageCard.placeholderValueNumber')}
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
        <View className='mt-5'>
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
