import { Pressable, ScrollView, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { VolumeIcon, DeleteIcon } from '../../../components/Icons';
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

  const scaleValue = new Animated.Value(1);

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
      <HeaderDescriptionPage title='Volume' icon={<VolumeIcon size={54} color='#F39C12' />} />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='ml'
          title='Milliliter'
          description='1 ml'
          onChangeText={value => convertVolume(value, 'ml')}
          value={milliliter}
          isActive={activeUnit === 'ml'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='L'
          title='Liter'
          description='1 l = 1000 ml'
          onChangeText={value => convertVolume(value, 'l')}
          value={liter}
          isActive={activeUnit === 'l'}
          onPress={clearInputs}
          maxLength={7}
        />
        <ConvertComponent
          abb='tsp'
          title='Teaspoon'
          description='1 tsp = 4.92892 ml'
          onChangeText={value => convertVolume(value, 'tsp')}
          value={teaspoon}
          isActive={activeUnit === 'tsp'}
          onPress={clearInputs}
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
          maxLength={8}
        />
        <ConvertComponent
          abb='cup'
          title='Cup'
          description='1 cup = 240 ml'
          onChangeText={value => convertVolume(value, 'cup')}
          value={cup}
          isActive={activeUnit === 'cup'}
          onPress={clearInputs}
          maxLength={7}
        />
      </View>

      {(!!milliliter || !!liter || !!teaspoon || !!tablespoon || !!cup) && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={clearInputs}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel='Clear Button'>
              <DeleteIcon size={48} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
