import { Pressable, ScrollView, Text, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CookingIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '@/components/ConvertComponent';

export default function Cooking() {
  const [milliliters, setMilliliters] = useState('');
  const [teaspoons, setTeaspoons] = useState('');
  const [tablespoons, setTablespoons] = useState('');
  const [cups, setCups] = useState('');
  const [activeUnit, setActiveUnit] = useState('ml');

  const clearInputs = () => {
    setMilliliters('');
    setTeaspoons('');
    setTablespoons('');
    setCups('');
  };

  const convertMeasurement = (value: string, unit: string) => {
    setActiveUnit(unit);
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue) || 0;
    if (isNaN(numericValue)) return;

    let ml = 0,
      tsp = 0,
      tbsp = 0,
      cup = 0;

    if (unit === 'ml') {
      ml = numericValue;
      tsp = ml / 4.92892;
      tbsp = ml / 14.7868;
      cup = ml / 236.588;
    } else if (unit === 'tsp') {
      tsp = numericValue;
      ml = tsp * 4.92892;
      tbsp = tsp / 3;
      cup = tbsp / 16;
    } else if (unit === 'tbsp') {
      tbsp = numericValue;
      tsp = tbsp * 3;
      ml = tbsp * 14.7868;
      cup = tbsp / 16;
    } else if (unit === 'cup') {
      cup = numericValue;
      tbsp = cup * 16;
      tsp = tbsp * 3;
      ml = cup * 236.588;
    }

    setMilliliters(unit === 'ml' ? cleanedValue : ml.toFixed(2));
    setTeaspoons(unit === 'tsp' ? cleanedValue : tsp.toFixed(2));
    setTablespoons(unit === 'tbsp' ? cleanedValue : tbsp.toFixed(2));
    setCups(unit === 'cup' ? cleanedValue : cup.toFixed(2));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Cooking' icon={<CookingIcon size={58} color='#F39C12' />} />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='ml'
          title='Milliliters'
          description='ml'
          onChangeText={value => convertMeasurement(value, 'ml')}
          value={milliliters}
          isActive={activeUnit === 'ml'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='tsp'
          title='Teaspoons'
          description='tsp'
          onChangeText={value => convertMeasurement(value, 'tsp')}
          value={teaspoons}
          isActive={activeUnit === 'tsp'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='tbsp'
          title='Tablespoons'
          description='tbsp'
          onChangeText={value => convertMeasurement(value, 'tbsp')}
          value={tablespoons}
          isActive={activeUnit === 'tbsp'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='cup'
          title='Cups'
          description='cup'
          onChangeText={value => convertMeasurement(value, 'cup')}
          value={cups}
          isActive={activeUnit === 'cup'}
          onPress={clearInputs}
          maxLength={9}
        />
      </View>

      {milliliters && teaspoons && tablespoons && cups && (
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
