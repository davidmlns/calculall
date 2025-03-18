import { Pressable, ScrollView, Text, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { WeightIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';

type WeightUnit = 'kg' | 'g' | 'mg' | 'lb' | 'oz' | 'ton';

const CONVERSION_FACTORS: Record<WeightUnit, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
  ton: 1000,
};

export default function Weight() {
  const [kilogramValue, setKilogramValue] = useState('');
  const [gramValue, setGramValue] = useState('');
  const [milligramValue, setMilligramValue] = useState('');
  const [poundValue, setPoundValue] = useState('');
  const [ounceValue, setOunceValue] = useState('');
  const [tonValue, setTonValue] = useState('');
  const [activeUnit, setActiveUnit] = useState<WeightUnit>('kg');

  const clearInputs = () => {
    setKilogramValue('');
    setGramValue('');
    setMilligramValue('');
    setPoundValue('');
    setOunceValue('');
    setTonValue('');
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
      ton: unit === 'ton' ? cleanedValue : (kilograms / CONVERSION_FACTORS.ton).toFixed(2),
    };

    setKilogramValue(updatedValues.kg);
    setGramValue(updatedValues.g);
    setMilligramValue(updatedValues.mg);
    setPoundValue(updatedValues.lb);
    setOunceValue(updatedValues.oz);
    setTonValue(updatedValues.ton);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Weight Converter'
        icon={<WeightIcon size={58} color='#1ABC9C' />}
      />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='kg'
          title='Kilogram'
          description='1 kg'
          onChangeText={value => convertWeight(value, 'kg')}
          value={kilogramValue}
          isActive={activeUnit === 'kg'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb='g'
          title='Gram'
          description='1 g = 0.001 kg'
          onChangeText={value => convertWeight(value, 'g')}
          value={gramValue}
          isActive={activeUnit === 'g'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb='mg'
          title='Milligram'
          description='1 mg = 0.000001 kg'
          onChangeText={value => convertWeight(value, 'mg')}
          value={milligramValue}
          isActive={activeUnit === 'mg'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb='lb'
          title='Pound'
          description='1 lb = 0.453592 kg'
          onChangeText={value => convertWeight(value, 'lb')}
          value={poundValue}
          isActive={activeUnit === 'lb'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb='oz'
          title='Ounce'
          description='1 oz = 0.0283495 kg'
          onChangeText={value => convertWeight(value, 'oz')}
          value={ounceValue}
          isActive={activeUnit === 'oz'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb='ton'
          title='Ton'
          description='1 ton = 1000 kg'
          onChangeText={value => convertWeight(value, 'ton')}
          value={tonValue}
          isActive={activeUnit === 'ton'}
          onPress={clearInputs}
          maxLength={4}
        />
      </View>

      {kilogramValue && (
        <View>
          <Pressable
            onPress={clearInputs}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Clear</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
