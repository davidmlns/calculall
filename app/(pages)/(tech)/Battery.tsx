import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { BatteryIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Battery() {
  const { t } = useTranslation('');
  const [result, setResult] = useState(t('batteryCard.defaultResult'));
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [currentDraw, setCurrentDraw] = useState('');

  const calculateBatteryLife = (capacity: number, current: number): string => {
    if (capacity <= 0 || current <= 0) return t('batteryCard.positiveValuesRequired');

    const batteryLife = capacity / current;
    return t('batteryCard.batteryLifeResult', { hours: Number(batteryLife.toFixed(2)) });
  };

  const handleCalculateBatteryLife = () => {
    const capacity = parseFloat(batteryCapacity);
    const current = parseFloat(currentDraw);

    if (!batteryCapacity || !currentDraw) {
      setResult(t('batteryCard.enterRequiredValues'));
      return;
    }

    if (isNaN(capacity) || isNaN(current)) {
      setResult(t('batteryCard.invalidInput'));
      return;
    }

    setResult(calculateBatteryLife(capacity, current));
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('batteryCard.title')}
          icon={<BatteryIcon size={52} color='#3498DB' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-90 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('batteryCard.valuesTitle')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('batteryCard.batteryCapacityPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={batteryCapacity}
            onChangeText={setBatteryCapacity}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-full text-slate-300'
            placeholder={t('batteryCard.currentDrawPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={currentDraw}
            onChangeText={setCurrentDraw}
            maxLength={5}
          />
        </View>
      </View>

      {batteryCapacity && currentDraw && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateBatteryLife}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('batteryCard.calculateButtonA11yLabel')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
