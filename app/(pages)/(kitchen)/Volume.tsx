import { Pressable, ScrollView, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { VolumeIcon, DeleteIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';
import { useTranslation } from 'react-i18next';

type VolumeUnit = 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup';

const conversionFactors = {
  ml: 1,
  l: 1000,
  tsp: 4.92892,
  tbsp: 14.7868,
  cup: 240,
};

export default function Volume() {
  const { t } = useTranslation('');
  const [milliliter, setMilliliter] = useState('');
  const [liter, setLiter] = useState('');
  const [teaspoon, setTeaspoon] = useState('');
  const [tablespoon, setTablespoon] = useState('');
  const [cup, setCup] = useState('');
  const [activeUnit, setActiveUnit] = useState<VolumeUnit>('volumeCard.ml');

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

    setMilliliter(
      unit === 'volumeCard.ml' ? cleanedValue : (milliliters / conversionFactors.ml).toFixed(2),
    );
    setLiter(
      unit === 'volumeCard.l' ? cleanedValue : (milliliters / conversionFactors.l).toFixed(2),
    );
    setTeaspoon(
      unit === 'volumeCard.tsp' ? cleanedValue : (milliliters / conversionFactors.tsp).toFixed(2),
    );
    setTablespoon(
      unit === 'volumeCard.tbsp' ? cleanedValue : (milliliters / conversionFactors.tbsp).toFixed(2),
    );
    setCup(
      unit === 'volumeCard.cup' ? cleanedValue : (milliliters / conversionFactors.cup).toFixed(2),
    );
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
        title={t('volumeCard.title')}
        icon={<VolumeIcon size={54} color='#F39C12' />}
      />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb={t('volumeCard.milliliter')}
          title={t('volumeCard.milliliter')}
          description={t('volumeCard.milliliterDesc')}
          onChangeText={value => convertVolume(value, 'ml')}
          value={milliliter}
          isActive={activeUnit === 'ml'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb={t('volumeCard.liter')}
          title={t('volumeCard.liter')}
          description={t('volumeCard.literDesc')}
          onChangeText={value => convertVolume(value, 'l')}
          value={liter}
          isActive={activeUnit === 'l'}
          onPress={clearInputs}
          maxLength={7}
        />
        <ConvertComponent
          abb={t('volumeCard.teaspoon')}
          title={t('volumeCard.teaspoon')}
          description={t('volumeCard.teaspoonDesc')}
          onChangeText={value => convertVolume(value, 'tsp')}
          value={teaspoon}
          isActive={activeUnit === 'tsp'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb={t('volumeCard.tablespoon')}
          title={t('volumeCard.tablespoon')}
          description={t('volumeCard.tablespoonDesc')}
          onChangeText={value => convertVolume(value, 'tbsp')}
          value={tablespoon}
          isActive={activeUnit === 'tbsp'}
          onPress={clearInputs}
          maxLength={8}
        />
        <ConvertComponent
          abb={t('volumeCard.cup')}
          title={t('volumeCard.cup')}
          description={t('volumeCard.cupDesc')}
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
              accessibilityLabel={t('volumeCard.clearButtonA11yLabel')}>
              <DeleteIcon size={48} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
