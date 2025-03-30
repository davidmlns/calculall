import { Pressable, ScrollView, Text, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CookingIcon, DeleteIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '@/components/ConvertComponent';
import { useTranslation } from 'react-i18next';

export default function Cooking() {
  const { t } = useTranslation('');
  const [milliliters, setMilliliters] = useState('');
  const [teaspoons, setTeaspoons] = useState('');
  const [tablespoons, setTablespoons] = useState('');
  const [cups, setCups] = useState('');
  const [activeUnit, setActiveUnit] = useState('ml');

  const scaleValue = new Animated.Value(1);

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

    if (unit === t('cookingCard.millilitersAbbr')) {
      ml = numericValue;
      tsp = ml / 4.92892;
      tbsp = ml / 14.7868;
      cup = ml / 236.588;
    } else if (unit === t('cookingCard.teaspoonsAbbr')) {
      tsp = numericValue;
      ml = tsp * 4.92892;
      tbsp = tsp / 3;
      cup = tbsp / 16;
    } else if (unit === t('cookingCard.tablespoonsAbbr')) {
      tbsp = numericValue;
      tsp = tbsp * 3;
      ml = tbsp * 14.7868;
      cup = tbsp / 16;
    } else if (unit === t('cookingCard.cupsAbbr')) {
      cup = numericValue;
      tbsp = cup * 16;
      tsp = tbsp * 3;
      ml = cup * 236.588;
    }

    setMilliliters(unit === t('cookingCard.millilitersAbbr') ? cleanedValue : ml.toFixed(2));
    setTeaspoons(unit === t('cookingCard.teaspoonsAbbr') ? cleanedValue : tsp.toFixed(2));
    setTablespoons(unit === t('cookingCard.tablespoonsAbbr') ? cleanedValue : tbsp.toFixed(2));
    setCups(unit === t('cookingCard.cupsAbbr') ? cleanedValue : cup.toFixed(2));
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
        title={t('cookingCard.title')}
        icon={<CookingIcon size={52} color='#F39C12' />}
      />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb={t('cookingCard.millilitersAbbr')}
          title={t('cookingCard.milliliters')}
          description={t('cookingCard.millilitersAbbr')}
          onChangeText={value => convertMeasurement(value, 'ml')}
          value={milliliters}
          isActive={activeUnit === 'ml'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb={t('cookingCard.teaspoonsAbbr')}
          title={t('cookingCard.teaspoons')}
          description={t('cookingCard.teaspoonsAbbr')}
          onChangeText={value => convertMeasurement(value, 'tsp')}
          value={teaspoons}
          isActive={activeUnit === 'tsp'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb={t('cookingCard.tablespoonsAbbr')}
          title={t('cookingCard.tablespoons')}
          description={t('cookingCard.tablespoonsAbbr')}
          onChangeText={value => convertMeasurement(value, 'tbsp')}
          value={tablespoons}
          isActive={activeUnit === 'tbsp'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb={t('cookingCard.cupsAbbr')}
          title={t('cookingCard.cups')}
          description={t('cookingCard.cupsAbbr')}
          onChangeText={value => convertMeasurement(value, 'cup')}
          value={cups}
          isActive={activeUnit === 'cup'}
          onPress={clearInputs}
          maxLength={9}
        />
      </View>

      {(milliliters || teaspoons || tablespoons || cups) && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={clearInputs}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('cookingCard.clearButtonA11yLabel')}>
              <DeleteIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
