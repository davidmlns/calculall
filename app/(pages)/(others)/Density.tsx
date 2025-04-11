import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DensityIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Density() {
  const { t } = useTranslation('');
  const [result, setResult] = useState(t('densityCard.defaultResult'));
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateDensity = (mass: number, volume: number): string => {
    if (mass <= 0 || volume <= 0) return t('densityCard.positiveValuesRequired');
    if (volume === 0) return t('densityCard.volumeCannotBeZero');

    const density = mass / volume;
    return t('densityCard.densityResult', { density: Number(density.toFixed(3)) });
  };

  const handleCalculateDensity = () => {
    const massValue = parseFloat(mass);
    const volumeValue = parseFloat(volume);

    if (!mass || !volume) {
      setResult(t('densityCard.enterRequiredValues'));
      return;
    }

    if (isNaN(massValue) || isNaN(volumeValue)) {
      setResult(t('densityCard.invalidInput'));
      return;
    }

    setResult(calculateDensity(massValue, volumeValue));
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('densityCard.title')}
          icon={<DensityIcon size={50} color='#1ABC9C' />}
        />
      </View>

      <View className='flex mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('densityCard.valuesTitle')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('densityCard.massPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={mass}
            onChangeText={setMass}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('densityCard.volumePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={volume}
            onChangeText={setVolume}
            maxLength={7}
          />
        </View>
      </View>

      {mass && volume && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateDensity}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('densityCard.calculateButtonA11yLabel')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
