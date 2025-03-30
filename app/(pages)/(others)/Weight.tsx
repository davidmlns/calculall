import { Pressable, ScrollView, Text, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { WeightIcon, DeleteIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';
import { useTranslation } from 'react-i18next';

type WeightUnit = 'kg' | 'g' | 'mg' | 'lb' | 'oz';

const CONVERSION_FACTORS: Record<WeightUnit, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
};

export default function Weight() {
  const { t } = useTranslation();
  const [kilogramValue, setKilogramValue] = useState('');
  const [gramValue, setGramValue] = useState('');
  const [milligramValue, setMilligramValue] = useState('');
  const [poundValue, setPoundValue] = useState('');
  const [ounceValue, setOunceValue] = useState('');
  const [activeUnit, setActiveUnit] = useState<WeightUnit>('kg');

  const scaleValue = new Animated.Value(1);

  const clearInputs = () => {
    setKilogramValue('');
    setGramValue('');
    setMilligramValue('');
    setPoundValue('');
    setOunceValue('');
  };

  const convertWeight = (value: string, unit: WeightUnit) => {
    setActiveUnit(unit);

    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue);

    if (isNaN(numericValue)) {
      clearInputs();
      return;
    }

    const kilograms = numericValue * CONVERSION_FACTORS[unit];

    const updatedValues = {
      kg: unit === 'kg' ? cleanedValue : kilograms.toFixed(2),
      g: unit === 'g' ? cleanedValue : (kilograms / CONVERSION_FACTORS.g).toFixed(2),
      mg: unit === 'mg' ? cleanedValue : (kilograms / CONVERSION_FACTORS.mg).toFixed(2),
      lb: unit === 'lb' ? cleanedValue : (kilograms / CONVERSION_FACTORS.lb).toFixed(2),
      oz: unit === 'oz' ? cleanedValue : (kilograms / CONVERSION_FACTORS.oz).toFixed(2),
    };

    setKilogramValue(updatedValues.kg);
    setGramValue(updatedValues.g);
    setMilligramValue(updatedValues.mg);
    setPoundValue(updatedValues.lb);
    setOunceValue(updatedValues.oz);
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
        title={t('weightConverter.title')}
        icon={<WeightIcon size={54} color='#1ABC9C' />}
      />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb={t('weightConverter.kilogram')}
          title={t('weightConverter.kilogram')}
          description={t('weightConverter.kgDescription')}
          onChangeText={value => convertWeight(value, 'kg')}
          value={kilogramValue}
          isActive={activeUnit === 'kg'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb={t('weightConverter.gram')}
          title={t('weightConverter.gram')}
          description={t('weightConverter.gDescription')}
          onChangeText={value => convertWeight(value, 'g')}
          value={gramValue}
          isActive={activeUnit === 'g'}
          onPress={clearInputs}
          maxLength={6}
        />
        <ConvertComponent
          abb={t('weightConverter.milligram')}
          title={t('weightConverter.milligram')}
          description={t('weightConverter.mgDescription')}
          onChangeText={value => convertWeight(value, 'mg')}
          value={milligramValue}
          isActive={activeUnit === 'mg'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb={t('weightConverter.pound')}
          title={t('weightConverter.pound')}
          description={t('weightConverter.lbDescription')}
          onChangeText={value => convertWeight(value, 'lb')}
          value={poundValue}
          isActive={activeUnit === 'lb'}
          onPress={clearInputs}
          maxLength={3}
        />
        <ConvertComponent
          abb={t('weightConverter.ounce')}
          title={t('weightConverter.ounce')}
          description={t('weightConverter.ozDescription')}
          onChangeText={value => convertWeight(value, 'oz')}
          value={ounceValue}
          isActive={activeUnit === 'oz'}
          onPress={clearInputs}
          maxLength={4}
        />
      </View>

      {!!(kilogramValue || gramValue || milligramValue || poundValue || ounceValue) && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={clearInputs}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('weightConverter.clearButton')}>
              <DeleteIcon size={48} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
