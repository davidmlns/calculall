import { Pressable, ScrollView, Text, View, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DigitalDataIcon, DeleteIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';
import { useTranslation } from 'react-i18next';

type DigitalDataUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

const conversionFactors = {
  B: 1,
  KB: 1024,
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776,
};

export default function DigitalData() {
  const { t } = useTranslation();
  const [bytes, setBytes] = useState('');
  const [kilobytes, setKilobytes] = useState('');
  const [megabytes, setMegabytes] = useState('');
  const [gigabytes, setGigabytes] = useState('');
  const [terabytes, setTerabytes] = useState('');
  const [activeUnit, setActiveUnit] = useState<DigitalDataUnit>('B');

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
    setBytes('');
    setKilobytes('');
    setMegabytes('');
    setGigabytes('');
    setTerabytes('');
  };

  const convertDigitalData = (value: string, unit: DigitalDataUnit) => {
    setActiveUnit(unit);
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue) || 0;
    if (isNaN(numericValue)) return;

    const bytesValue = numericValue * conversionFactors[unit];

    setBytes(unit === 'B' ? cleanedValue : (bytesValue / conversionFactors['B']).toFixed(2));
    setKilobytes(unit === 'KB' ? cleanedValue : (bytesValue / conversionFactors['KB']).toFixed(2));
    setMegabytes(unit === 'MB' ? cleanedValue : (bytesValue / conversionFactors['MB']).toFixed(2));
    setGigabytes(unit === 'GB' ? cleanedValue : (bytesValue / conversionFactors['GB']).toFixed(2));
    setTerabytes(unit === 'TB' ? cleanedValue : (bytesValue / conversionFactors['TB']).toFixed(2));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <View className='mb-6'>
        <HeaderDescriptionPage
          title={t('digitalDataCard.title')}
          icon={<DigitalDataIcon size={54} color='#3498DB' />}
        />
      </View>

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='B'
          title={t('digitalDataCard.bytes')}
          description={t('digitalDataCard.bytesDescription')}
          onChangeText={value => convertDigitalData(value, 'B')}
          value={bytes}
          isActive={activeUnit === 'B'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='KB'
          title={t('digitalDataCard.kilobytes')}
          description={t('digitalDataCard.kilobytesDescription')}
          onChangeText={value => convertDigitalData(value, 'KB')}
          value={kilobytes}
          isActive={activeUnit === 'KB'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='MB'
          title={t('digitalDataCard.megabytes')}
          description={t('digitalDataCard.megabytesDescription')}
          onChangeText={value => convertDigitalData(value, 'MB')}
          value={megabytes}
          isActive={activeUnit === 'MB'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='GB'
          title={t('digitalDataCard.gigabytes')}
          description={t('digitalDataCard.gigabytesDescription')}
          onChangeText={value => convertDigitalData(value, 'GB')}
          value={gigabytes}
          isActive={activeUnit === 'GB'}
          onPress={clearInputs}
          maxLength={8}
        />
        <ConvertComponent
          abb='TB'
          title={t('digitalDataCard.terabytes')}
          description={t('digitalDataCard.terabytesDescription')}
          onChangeText={value => convertDigitalData(value, 'TB')}
          value={terabytes}
          isActive={activeUnit === 'TB'}
          onPress={clearInputs}
          maxLength={2}
        />
      </View>

      {(bytes || kilobytes || megabytes || gigabytes || terabytes) && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={clearInputs}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('digitalDataCard.clearButtonA11yLabel')}>
              <DeleteIcon size={48} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
