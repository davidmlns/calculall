import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { PressureIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

const calculatePressure = (force: number, area: number, t: any): string => {
  if (force <= 0 || area <= 0) return t('pressureCard.errors.positiveValues');
  return t('pressureCard.result', { value: (force / area).toFixed(2) });
};

export default function Pressure() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('pressureCard.defaultResult'));
  const [forceValue, setForceValue] = useState('');
  const [areaValue, setAreaValue] = useState('');

  const handleCalculatePressure = () => {
    const force = parseFloat(forceValue);
    const area = parseFloat(areaValue);

    if (!forceValue || !areaValue) {
      setResult(t('pressureCard.errors.enterBothValues'));
      return;
    }

    if (isNaN(force) || isNaN(area)) {
      setResult(t('pressureCard.errors.invalidInput'));
      return;
    }

    setResult(calculatePressure(force, area, t));
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
        title={t('pressureCard.title')}
        icon={<PressureIcon size={54} color='#2E86C1' />}
      />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('pressureCard.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('pressureCard.forcePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={forceValue}
            onChangeText={setForceValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('pressureCard.areaPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={areaValue}
            onChangeText={setAreaValue}
            maxLength={9}
          />
        </View>
      </View>

      {forceValue && areaValue && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculatePressure}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('pressureCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
