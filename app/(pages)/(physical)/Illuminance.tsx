import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { IlluminanceIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const calculateIlluminance = (
  intensity: number,
  distance: number,
  angleDegrees: number,
): string => {
  const angleRadians = angleDegrees * (Math.PI / 180);
  const cosine = Math.cos(angleRadians);
  const illuminance = (intensity / distance ** 2) * cosine;
  return illuminance.toFixed(2);
};

export default function Illuminance() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('illuminanceCard.defaultResult'));
  const [valueIntensityTextInputValues, setValueIntensityTextInputValues] = useState('');
  const [valueDistanceTextInputValues, setValueDistanceTextInputValues] = useState('');
  const [valueAngleTextInputValues, setValueAngleTextInputValues] = useState('');

  const scaleValue = new Animated.Value(1);

  const handleCalculateIlluminance = () => {
    const intensity = parseFloat(valueIntensityTextInputValues);
    const distance = parseFloat(valueDistanceTextInputValues);
    const angle = parseFloat(valueAngleTextInputValues);

    if (
      !valueIntensityTextInputValues ||
      !valueDistanceTextInputValues ||
      !valueAngleTextInputValues
    ) {
      setResult(t('illuminanceCard.errors.enterAllValues'));
      return;
    }

    if (isNaN(intensity) || isNaN(distance) || isNaN(angle)) {
      setResult(t('illuminanceCard.errors.invalidInput'));
      return;
    }

    if (intensity < 0 || distance <= 0 || angle < 0) {
      setResult(t('illuminanceCard.errors.positiveValues'));
      return;
    }

    const illuminance = calculateIlluminance(intensity, distance, angle);
    setResult(t('illuminanceCard.result', { value: illuminance }));
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
        title={t('illuminanceCard.title')}
        icon={<IlluminanceIcon size={54} color='#2E86C1' />}
      />

      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('illuminanceCard.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('illuminanceCard.intensityPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueIntensityTextInputValues}
            onChangeText={setValueIntensityTextInputValues}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('illuminanceCard.distancePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueDistanceTextInputValues}
            onChangeText={setValueDistanceTextInputValues}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300'
            placeholder={t('illuminanceCard.anglePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueAngleTextInputValues}
            onChangeText={setValueAngleTextInputValues}
            maxLength={9}
          />
        </View>
      </View>

      {valueIntensityTextInputValues &&
        valueDistanceTextInputValues &&
        valueAngleTextInputValues && (
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateIlluminance}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('illuminanceCard.calculateButton')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        )}
    </ScrollView>
  );
}
