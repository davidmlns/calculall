import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ElectricCurrentIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ElectricCurrent() {
  const { t } = useTranslation('');
  const [result, setResult] = useState(t('electricCurrentCard.defaultResult'));
  const [voltage, setVoltage] = useState('');
  const [resistance, setResistance] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateCurrent = (voltage: number, resistance: number): string => {
    if (voltage <= 0 || resistance <= 0) return t('electricCurrentCard.positiveValuesRequired');
    if (resistance === 0) return t('electricCurrentCard.resistanceCannotBeZero');

    const current = voltage / resistance;
    return t('electricCurrentCard.currentResult', { current: Number(current.toFixed(4)) });
  };

  const handleCalculateCurrent = () => {
    const v = parseFloat(voltage);
    const r = parseFloat(resistance);

    if (!voltage || !resistance) {
      setResult(t('electricCurrentCard.enterRequiredValues'));
      return;
    }

    if (isNaN(v) || isNaN(r)) {
      setResult(t('electricCurrentCard.invalidInput'));
      return;
    }

    setResult(calculateCurrent(v, r));
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
          title={t('electricCurrentCard.title')}
          icon={<ElectricCurrentIcon size={51} color='#3498DB' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('electricCurrentCard.valuesTitle')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('electricCurrentCard.voltagePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={voltage}
            onChangeText={setVoltage}
            maxLength={7}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('electricCurrentCard.resistancePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={resistance}
            onChangeText={setResistance}
            maxLength={5}
          />
        </View>
      </View>

      {voltage && resistance && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateCurrent}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('electricCurrentCard.calculateButtonA11yLabel')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
