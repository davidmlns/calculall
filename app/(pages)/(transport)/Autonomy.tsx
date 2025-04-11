import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { AutonomyIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Autonomy() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('autonomyCard.resultPlaceholder'));
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [energyConsumption, setEnergyConsumption] = useState('');

  const calculateRange = (capacity: number, consumption: number): string => {
    if (capacity <= 0 || consumption <= 0) {
      return t('autonomyCard.errors.positiveValues');
    }

    const range = (capacity / consumption) * 100;
    return `${t('autonomyCard.results.estimatedRange')}: ${Number(range.toFixed(2))} ${t('autonomyCard.unit')}`;
  };

  const handleCalculateRange = () => {
    const capacity = parseFloat(batteryCapacity);
    const consumption = parseFloat(energyConsumption);

    if (!batteryCapacity || !energyConsumption) {
      setResult(t('autonomyCard.errors.requiredValues'));
      return;
    }

    if (isNaN(capacity) || isNaN(consumption)) {
      setResult(t('autonomyCard.errors.invalidInput'));
      return;
    }

    setResult(calculateRange(capacity, consumption));
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
          title={t('autonomyCard.title')}
          icon={<AutonomyIcon size={51} color='#7F8C8D' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-96 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('autonomyCard.common.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-96 text-slate-300'
            placeholder={t('autonomyCard.placeholders.batteryCapacity')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={batteryCapacity}
            onChangeText={setBatteryCapacity}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-96 text-slate-300'
            placeholder={t('autonomyCard.placeholders.energyConsumption')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={energyConsumption}
            onChangeText={setEnergyConsumption}
            maxLength={5}
          />
        </View>
      </View>

      {batteryCapacity && energyConsumption && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateRange}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('autonomyCard.common.calculateButton')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
