import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ElectricConsumptionIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function ElectricConsumption() {
  const { t } = useTranslation('');
  const [result, setResult] = useState(t('electricalResistanceCard.defaultResult'));
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [time, setTime] = useState('');

  const calculateConsumption = (voltage: number, current: number, time: number): string => {
    if (voltage <= 0 || current <= 0 || time <= 0)
      return t('electricConsumptionCard.positiveValuesRequired');

    const power = voltage * current;
    const consumption = power * time;
    return t('electricConsumptionCard.consumptionResult', {
      consumption: Number(consumption.toFixed(4)),
    });
  };

  const handleCalculateConsumption = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const t = parseFloat(time);

    if (!voltage || !current || !time) {
      setResult(t('electricalResistanceCard.enterRequiredValues'));
      return;
    }

    if (isNaN(v) || isNaN(i) || isNaN(t)) {
      setResult(t('electricalResistanceCard.invalidInput'));
      return;
    }

    setResult(calculateConsumption(v, i, t));
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
          title={t('electricConsumptionCard.title')}
          icon={<ElectricConsumptionIcon size={51} color='#3498DB' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('electricConsumptionCard.valuesTitle')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('electricConsumptionCard.voltagePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={voltage}
            onChangeText={setVoltage}
            maxLength={5}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('electricConsumptionCard.currentPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={current}
            onChangeText={setCurrent}
            maxLength={3}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('electricConsumptionCard.timePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={time}
            onChangeText={setTime}
            maxLength={3}
          />
        </View>
      </View>

      {voltage && current && time && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateConsumption}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('electricConsumptionCard.calculateButtonA11yLabel')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
