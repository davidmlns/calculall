import { Pressable, ScrollView, Text, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { LengthIcon, DeleteIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '@/components/ConvertComponent';
import { useTranslation } from 'react-i18next';

type LengthUnit = 'm' | 'km' | 'cm' | 'mm' | 'dm' | 'hm' | 'in' | 'ft' | 'yd' | 'mi';

const CONVERSION_FACTORS: Record<LengthUnit, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  dm: 0.1,
  hm: 100,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.34,
};

export default function Length() {
  const { t } = useTranslation();
  const [meterValue, setMeterValue] = useState('');
  const [kilometerValue, setKilometerValue] = useState('');
  const [centimeterValue, setCentimeterValue] = useState('');
  const [millimeterValue, setMillimeterValue] = useState('');
  const [decimeterValue, setDecimeterValue] = useState('');
  const [hectometerValue, setHectometerValue] = useState('');
  const [inchValue, setInchValue] = useState('');
  const [footValue, setFootValue] = useState('');
  const [yardValue, setYardValue] = useState('');
  const [mileValue, setMileValue] = useState('');
  const [activeUnit, setActiveUnit] = useState<LengthUnit>('m');

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

  const clearInputs = () => {
    setMeterValue('');
    setKilometerValue('');
    setCentimeterValue('');
    setMillimeterValue('');
    setDecimeterValue('');
    setHectometerValue('');
    setInchValue('');
    setFootValue('');
    setYardValue('');
    setMileValue('');
  };

  const convertLength = (value: string, unit: LengthUnit) => {
    setActiveUnit(unit);

    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue);

    if (isNaN(numericValue)) {
      clearInputs();
      return;
    }

    const meters = numericValue * CONVERSION_FACTORS[unit];

    const updatedValues = {
      m: unit === 'm' ? cleanedValue : meters.toFixed(2),
      km: unit === 'km' ? cleanedValue : (meters / CONVERSION_FACTORS.km).toFixed(2),
      cm: unit === 'cm' ? cleanedValue : (meters / CONVERSION_FACTORS.cm).toFixed(2),
      mm: unit === 'mm' ? cleanedValue : (meters / CONVERSION_FACTORS.mm).toFixed(2),
      dm: unit === 'dm' ? cleanedValue : (meters / CONVERSION_FACTORS.dm).toFixed(2),
      hm: unit === 'hm' ? cleanedValue : (meters / CONVERSION_FACTORS.hm).toFixed(2),
      in: unit === 'in' ? cleanedValue : (meters / CONVERSION_FACTORS.in).toFixed(2),
      ft: unit === 'ft' ? cleanedValue : (meters / CONVERSION_FACTORS.ft).toFixed(2),
      yd: unit === 'yd' ? cleanedValue : (meters / CONVERSION_FACTORS.yd).toFixed(2),
      mi: unit === 'mi' ? cleanedValue : (meters / CONVERSION_FACTORS.mi).toFixed(2),
    };

    setMeterValue(updatedValues.m);
    setKilometerValue(updatedValues.km);
    setCentimeterValue(updatedValues.cm);
    setMillimeterValue(updatedValues.mm);
    setDecimeterValue(updatedValues.dm);
    setHectometerValue(updatedValues.hm);
    setInchValue(updatedValues.in);
    setFootValue(updatedValues.ft);
    setYardValue(updatedValues.yd);
    setMileValue(updatedValues.mi);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title={t('lengthCard.title')}
        icon={<LengthIcon size={52} color='#6C3483' />}
      />

      <View className='flex-col items-center mb-10'>
        <ConvertComponent
          abb='m'
          title={t('lengthCard.meter')}
          description='1 m'
          onChangeText={value => convertLength(value, 'm')}
          value={meterValue}
          isActive={activeUnit === 'm'}
          onPress={clearInputs}
          maxLength={7}
        />
        <ConvertComponent
          abb='km'
          title={t('lengthCard.kilometer')}
          description='1 km = 1000 m'
          onChangeText={value => convertLength(value, 'km')}
          value={kilometerValue}
          isActive={activeUnit === 'km'}
          onPress={clearInputs}
          maxLength={5}
        />
        <ConvertComponent
          abb='cm'
          title={t('lengthCard.centimeter')}
          description='1 cm = 0.01 m'
          onChangeText={value => convertLength(value, 'cm')}
          value={centimeterValue}
          isActive={activeUnit === 'cm'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb='mm'
          title={t('lengthCard.millimeter')}
          description='1 mm = 0.001 m'
          onChangeText={value => convertLength(value, 'mm')}
          value={millimeterValue}
          isActive={activeUnit === 'mm'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb='dm'
          title={t('lengthCard.decimeter')}
          description='1 dm = 0.1 m'
          onChangeText={value => convertLength(value, 'dm')}
          value={decimeterValue}
          isActive={activeUnit === 'dm'}
          onPress={clearInputs}
          maxLength={7}
        />
        <ConvertComponent
          abb='hm'
          title={t('lengthCard.hectometer')}
          description='1 hm = 100 m'
          onChangeText={value => convertLength(value, 'hm')}
          value={hectometerValue}
          isActive={activeUnit === 'hm'}
          onPress={clearInputs}
          maxLength={6}
        />
        <ConvertComponent
          abb='in'
          title={t('lengthCard.inch')}
          description='1 in = 0.0254 m'
          onChangeText={value => convertLength(value, 'in')}
          value={inchValue}
          isActive={activeUnit === 'in'}
          onPress={clearInputs}
        />
        <ConvertComponent
          abb='ft'
          title={t('lengthCard.foot')}
          description='1 ft = 0.3048 m'
          onChangeText={value => convertLength(value, 'ft')}
          value={footValue}
          isActive={activeUnit === 'ft'}
          onPress={clearInputs}
          maxLength={8}
        />
        <ConvertComponent
          abb='yd'
          title={t('lengthCard.yard')}
          description='1 yd = 0.9144 m'
          onChangeText={value => convertLength(value, 'yd')}
          value={yardValue}
          isActive={activeUnit === 'yd'}
          onPress={clearInputs}
          maxLength={7}
        />
        <ConvertComponent
          abb='mi'
          title={t('lengthCard.mile')}
          description='1 mi = 1609.34 m'
          onChangeText={value => convertLength(value, 'mi')}
          value={mileValue}
          isActive={activeUnit === 'mi'}
          onPress={clearInputs}
          maxLength={4}
        />
      </View>

      {meterValue && (
        <View className=''>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={clearInputs}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('lengthCard.clearButton')}>
              <DeleteIcon size={48} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
