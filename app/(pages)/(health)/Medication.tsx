import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { MedicationIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

const scaleValue = new Animated.Value(1);

export default function Medication() {
  const [result, setResult] = useState('The result will appear here');
  const [weight, setWeight] = useState('');
  const [dosagePerKg, setDosagePerKg] = useState('');
  const [maxDosage, setMaxDosage] = useState('');

  const calculateDosage = (
    weight: number,
    dosagePerKg: number,
    maxDosage: number | null,
  ): string => {
    if (weight <= 0 || dosagePerKg <= 0) return 'Values must be positive';
    if (maxDosage !== null && maxDosage <= 0) return 'Max dosage must be positive';

    let totalDosage = weight * dosagePerKg;

    if (maxDosage !== null && totalDosage > maxDosage) {
      totalDosage = maxDosage;
    }

    return `${Number(totalDosage.toFixed(2))} mg`;
  };

  const handleCalculateDosage = () => {
    const w = parseFloat(weight);
    const d = parseFloat(dosagePerKg);
    const m = maxDosage ? parseFloat(maxDosage) : null;

    if (!weight || !dosagePerKg) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(w) || isNaN(d) || (m !== null && isNaN(m))) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateDosage(w, d, m));
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
        title='Medication'
        icon={<MedicationIcon size={54} color='#E74C3C' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-80 text-slate-300'
            placeholder='Enter weight (kg)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={weight}
            onChangeText={setWeight}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-80 text-slate-300'
            placeholder='Enter dosage per kg (mg)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={dosagePerKg}
            onChangeText={setDosagePerKg}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-80 text-slate-300'
            placeholder='Enter max dosage (mg)*'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={maxDosage}
            onChangeText={setMaxDosage}
            maxLength={9}
          />
        </View>
      </View>

      {weight && dosagePerKg && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateDosage}
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
