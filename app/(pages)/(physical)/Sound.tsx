import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { SoundIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Sound() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('soundCard.defaultResult'));
  const [soundPressure, setSoundPressure] = useState('');
  const [distance, setDistance] = useState('');

  const calculateSoundIntensity = (pressure: number, distance: number): string => {
    const AIR_DENSITY = 1.225;
    const SPEED_OF_SOUND = 343;
    const REFERENCE_INTENSITY = 1e-12;

    if (pressure <= 0 || distance <= 0) return t('soundCard.errors.positiveValues');

    const intensity = pressure ** 2 / (2 * AIR_DENSITY * SPEED_OF_SOUND);
    const dB = 10 * Math.log10(intensity / REFERENCE_INTENSITY);

    return t('soundCard.result', { value: Math.round(dB * 100) / 100 });
  };

  const handleCalculateSoundIntensity = () => {
    const pressure = parseFloat(soundPressure);
    const dist = parseFloat(distance);

    if (!soundPressure || !distance) {
      setResult(t('soundCard.errors.enterBothValues'));
      return;
    }

    if (isNaN(pressure) || isNaN(dist)) {
      setResult(t('soundCard.errors.invalidInput'));
      return;
    }

    setResult(calculateSoundIntensity(pressure, dist));
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
          title={t('soundCard.title')}
          icon={<SoundIcon size={54} color='#2E86C1' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('soundCard.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('soundCard.pressurePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={soundPressure}
            onChangeText={setSoundPressure}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('soundCard.distancePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distance}
            onChangeText={setDistance}
            maxLength={9}
          />
        </View>
      </View>

      {soundPressure && distance && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateSoundIntensity}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('soundCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
