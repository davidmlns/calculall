import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { MedicationIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Medication() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('medicationCard.resultPlaceholder'));
  const [weight, setWeight] = useState('');
  const [dosagePerKg, setDosagePerKg] = useState('');
  const [maxDosage, setMaxDosage] = useState('');

  const calculateDosage = (
    weight: number,
    dosagePerKg: number,
    maxDosage: number | null,
  ): string => {
    if (weight <= 0 || dosagePerKg <= 0) return t('medicationCard.errors.positiveValues');
    if (maxDosage !== null && maxDosage <= 0) return t('medicationCard.errors.positiveMaxDosage');

    let totalDosage = weight * dosagePerKg;

    if (maxDosage !== null && totalDosage > maxDosage) {
      totalDosage = maxDosage;
    }

    return `${Number(totalDosage.toFixed(2))} ${t('medicationCard.unit')}`;
  };

  const handleCalculateDosage = () => {
    const w = parseFloat(weight);
    const d = parseFloat(dosagePerKg);
    const m = maxDosage ? parseFloat(maxDosage) : null;

    if (!weight || !dosagePerKg) {
      setResult(t('medicationCard.errors.requiredValues'));
      return;
    }

    if (isNaN(w) || isNaN(d) || (m !== null && isNaN(m))) {
      setResult(t('medicationCard.errors.invalidInput'));
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('medicationCard.title')}
          icon={<MedicationIcon size={54} color='#E74C3C' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('medicationCard.common.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('medicationCard.placeholders.weight')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={weight}
            onChangeText={setWeight}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('medicationCard.placeholders.dosagePerKg')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={dosagePerKg}
            onChangeText={setDosagePerKg}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('medicationCard.placeholders.maxDosage')}
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
              accessibilityLabel={t('medicationCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
