import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { RadiationIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Radiation() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('radiationCard.defaultResult'));
  const [powerValue, setPowerValue] = useState('');
  const [areaValue, setAreaValue] = useState('');

  const calculateRadiation = (power: number, area: number): string => {
    if (power <= 0 || area <= 0) return t('radiationCard.errors.positiveValues');
    return t('radiationCard.result', { value: (power / area).toFixed(2) });
  };

  const handleCalculateRadiation = () => {
    const power = parseFloat(powerValue);
    const area = parseFloat(areaValue);

    if (!powerValue || !areaValue) {
      setResult(t('radiationCard.errors.enterBothValues'));
      return;
    }

    if (isNaN(power) || isNaN(area)) {
      setResult(t('radiationCard.errors.invalidInput'));
      return;
    }

    setResult(calculateRadiation(power, area));
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
          title={t('radiationCard.title')}
          icon={<RadiationIcon size={56} color='#2E86C1' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('radiationCard.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('radiationCard.powerPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={powerValue}
            onChangeText={setPowerValue}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('radiationCard.areaPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={areaValue}
            onChangeText={setAreaValue}
            maxLength={9}
          />
        </View>
      </View>

      {powerValue && areaValue && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateRadiation}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('radiationCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
