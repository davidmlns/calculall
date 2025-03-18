import { Pressable, ScrollView, Text, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { VolumeIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';

type VolumeUnit = 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup';

const conversionFactors = {
  ml: 1,
  l: 1000,
  tsp: 4.92892,
  tbsp: 14.7868,
  cup: 240,
};

export default function Volume() {
  const [milliliter, setMilliliter] = useState('');
  const [liter, setLiter] = useState('');
  const [teaspoon, setTeaspoon] = useState('');
  const [tablespoon, setTablespoon] = useState('');
  const [cup, setCup] = useState('');
  const [activeUnit, setActiveUnit] = useState<VolumeUnit>('ml');

  const clearInputs = () => {
    setMilliliter('');
    setLiter('');
    setTeaspoon('');
    setTablespoon('');
    setCup('');
  };

  const convertVolume = (value: string, unit: VolumeUnit) => {
    setActiveUnit(unit);
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue) || 0;
    if (isNaN(numericValue)) return;

    const milliliters = numericValue * conversionFactors[unit];

    setMilliliter(unit === 'ml' ? cleanedValue : (milliliters / conversionFactors.ml).toFixed(2));
    setLiter(unit === 'l' ? cleanedValue : (milliliters / conversionFactors.l).toFixed(2));
    setTeaspoon(unit === 'tsp' ? cleanedValue : (milliliters / conversionFactors.tsp).toFixed(2));
    setTablespoon(
      unit === 'tbsp' ? cleanedValue : (milliliters / conversionFactors.tbsp).toFixed(2),
    );
    setCup(unit === 'cup' ? cleanedValue : (milliliters / conversionFactors.cup).toFixed(2));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Volume' icon={<VolumeIcon size={58} color='#F39C12' />} />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='ml'
          title='Milliliter'
          description='1 ml'
          onChangeText={value => convertVolume(value, 'ml')}
          value={milliliter}
          isActive={activeUnit === 'ml'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='l'
          title='Liter'
          description='1 l = 1000 ml'
          onChangeText={value => convertVolume(value, 'l')}
          value={liter}
          isActive={activeUnit === 'l'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='tsp'
          title='Teaspoon'
          description='1 tsp = 4.92892 ml'
          onChangeText={value => convertVolume(value, 'tsp')}
          value={teaspoon}
          isActive={activeUnit === 'tsp'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='tbsp'
          title='Tablespoon'
          description='1 tbsp = 14.78 ml'
          onChangeText={value => convertVolume(value, 'tbsp')}
          value={tablespoon}
          isActive={activeUnit === 'tbsp'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='cup'
          title='Cup'
          description='1 cup = 240 ml'
          onChangeText={value => convertVolume(value, 'cup')}
          value={cup}
          isActive={activeUnit === 'cup'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
      </View>

      {(!!milliliter || !!liter || !!teaspoon || !!tablespoon || !!cup) && (
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
