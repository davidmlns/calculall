import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { OhmIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PERMEABILITY = 4 * Math.PI * 1e-7;

const calculateMagneticField = (current: number, distance: number): string => {
  return ((PERMEABILITY * current) / (2 * Math.PI * distance)).toExponential(2);
};

export default function Ohm() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('ohmCard.defaultResult'));
  const [currentValue, setCurrentValue] = useState('');
  const [distanceValue, setDistanceValue] = useState('');
  const scaleValue = new Animated.Value(1);

  const handleCalculateMagnetism = () => {
    const current = parseFloat(currentValue);
    const distance = parseFloat(distanceValue);

    if (!currentValue || !distanceValue) {
      setResult(t('ohmCard.errors.enterBothValues'));
      return;
    }

    if (isNaN(current) || isNaN(distance)) {
      setResult(t('ohmCard.errors.invalidInput'));
      return;
    }

    if (current < 0 || distance <= 0) {
      setResult(t('ohmCard.errors.positiveValues'));
      return;
    }

    const magneticField = calculateMagneticField(current, distance);
    setResult(t('ohmCard.result', { value: magneticField }));
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
          title={t('ohmCard.title')}
          icon={<OhmIcon size={50} color='#2E86C1' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('ohmCard.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('ohmCard.currentPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={currentValue}
            onChangeText={setCurrentValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('ohmCard.distancePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distanceValue}
            onChangeText={setDistanceValue}
            maxLength={9}
          />
        </View>
      </View>

      {currentValue && distanceValue && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateMagnetism}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('ohmCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
