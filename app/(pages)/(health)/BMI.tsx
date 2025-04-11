import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { BMIIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function BMI() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('bmiCard.resultPlaceholder'));
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const calculateBMI = (weight: number, height: number): string => {
    if (weight <= 0 || height <= 0) return t('bmiCard.errors.positiveValues');

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return `${Math.round(bmi * 100) / 100}`;
  };

  const getBMIClassification = (bmi: number): string => {
    if (bmi < 18.5) return t('bmiCard.classification.underweight');
    if (bmi >= 18.5 && bmi <= 24.9) return t('bmiCard.classification.normal');
    if (bmi >= 25 && bmi <= 29.9) return t('bmiCard.classification.overweight');
    return t('bmiCard.classification.obesity');
  };

  const handleCalculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!weight || !height) {
      setResult(t('bmiCard.errors.enterBothValues'));
      return;
    }

    if (isNaN(w) || isNaN(h)) {
      setResult(t('bmiCard.errors.invalidInput'));
      return;
    }

    const bmi = calculateBMI(w, h);
    const classification = getBMIClassification(parseFloat(bmi));
    setResult(`${bmi} (${classification})`);
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('bmiCard.title')}
          icon={<BMIIcon size={50} color='#E74C3C' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('bmiCard.common.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('bmiCard.placeholders.weight')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={weight}
            onChangeText={setWeight}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('bmiCard.placeholders.height')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={height}
            onChangeText={setHeight}
            maxLength={9}
          />
        </View>
      </View>

      {weight && height && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateBMI}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('bmiCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
