import { Pressable, ScrollView, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { EnergyIcon, DeleteIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';
import { useTranslation } from 'react-i18next';

type EnergyUnit = 'J' | 'KJ' | 'Cal' | 'kWh' | 'BTU';

const conversionFactors = {
  J: 1,
  KJ: 1000,
  Cal: 4.184,
  kWh: 3.6e6,
  BTU: 1055,
};

export default function Energy() {
  const { t } = useTranslation();

  const [joule, setJoule] = useState('');
  const [kilojoule, setKilojoule] = useState('');
  const [calorie, setCalorie] = useState('');
  const [kilowattHour, setKilowattHour] = useState('');
  const [britishThermalUnit, setBritishThermalUnit] = useState('');
  const [activeUnit, setActiveUnit] = useState<EnergyUnit>('J');

  const clearInputs = () => {
    setJoule('');
    setKilojoule('');
    setCalorie('');
    setKilowattHour('');
    setBritishThermalUnit('');
  };

  const convertEnergy = (value: string, unit: EnergyUnit) => {
    setActiveUnit(unit);
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue) || 0;
    if (isNaN(numericValue)) return;

    const joules = numericValue * conversionFactors[unit];

    setJoule(unit === 'J' ? cleanedValue : (joules / conversionFactors.J).toFixed(2));
    setKilojoule(unit === 'KJ' ? cleanedValue : (joules / conversionFactors.KJ).toFixed(2));
    setCalorie(unit === 'Cal' ? cleanedValue : (joules / conversionFactors.Cal).toFixed(2));
    setKilowattHour(unit === 'kWh' ? cleanedValue : (joules / conversionFactors.kWh).toFixed(2));
    setBritishThermalUnit(
      unit === 'BTU' ? cleanedValue : (joules / conversionFactors.BTU).toFixed(2),
    );
  };

  const scaleValue = new Animated.Value(1);

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
      <View className='mb-6'>
        <HeaderDescriptionPage
          title={t('energyCard.title')}
          icon={<EnergyIcon size={54} color='#2E86C1' />}
        />
      </View>

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='J'
          title={t('energyCard.units.joule.title')}
          description={t('energyCard.units.joule.description')}
          onChangeText={value => convertEnergy(value, 'J')}
          value={joule}
          isActive={activeUnit === 'J'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='KJ'
          title={t('energyCard.units.kilojoule.title')}
          description={t('energyCard.units.kilojoule.description')}
          onChangeText={value => convertEnergy(value, 'KJ')}
          value={kilojoule}
          isActive={activeUnit === 'KJ'}
          onPress={clearInputs}
          maxLength={6}
        />
        <ConvertComponent
          abb='Cal'
          title={t('energyCard.units.calorie.title')}
          description={t('energyCard.units.calorie.description')}
          onChangeText={value => convertEnergy(value, 'Cal')}
          value={calorie}
          isActive={activeUnit === 'Cal'}
          onPress={clearInputs}
          maxLength={8}
        />
        <ConvertComponent
          abb='kWh'
          title={t('energyCard.units.kilowattHour.title')}
          description={t('energyCard.units.kilowattHour.description')}
          onChangeText={value => convertEnergy(value, 'kWh')}
          value={kilowattHour}
          isActive={activeUnit === 'kWh'}
          onPress={clearInputs}
          maxLength={2}
        />
        <ConvertComponent
          abb='BTU'
          title={t('energyCard.units.btu.title')}
          description={t('energyCard.units.btu.description')}
          onChangeText={value => convertEnergy(value, 'BTU')}
          value={britishThermalUnit}
          isActive={activeUnit === 'BTU'}
          onPress={clearInputs}
          maxLength={9}
        />
      </View>

      {(!!joule || !!kilojoule || !!calorie || !!kilowattHour || !!britishThermalUnit) && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={clearInputs}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('energyCard.clearButton')}>
              <DeleteIcon size={48} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
