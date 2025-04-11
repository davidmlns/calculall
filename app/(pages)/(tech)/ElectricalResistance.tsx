import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { ElectricalResistanceIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ElectricalResistance() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('electricalResistanceCard.defaultResult'));
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateResistance = (voltage: number, current: number): string => {
    if (voltage <= 0 || current <= 0) return t('electricalResistanceCard.positiveValuesRequired');
    if (current === 0) return t('electricalResistanceCard.currentCannotBeZero');

    const resistance = voltage / current;
    return t('electricalResistanceCard.resistanceResult', {
      resistance: Number(resistance.toFixed(4)),
    });
  };

  const handleCalculateResistance = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);

    if (!voltage || !current) {
      setResult(t('electricalResistanceCard.enterRequiredValues'));
      return;
    }

    if (isNaN(v) || isNaN(i)) {
      setResult(t('electricalResistanceCard.invalidInput'));
      return;
    }

    setResult(calculateResistance(v, i));
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
          title={t('electricalResistanceCard.title')}
          icon={<ElectricalResistanceIcon size={52} color='#3498DB' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('electricalResistanceCard.valuesTitle')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('electricalResistanceCard.voltagePlaceholder')}
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
            placeholder={t('electricalResistanceCard.currentPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={current}
            onChangeText={setCurrent}
            maxLength={3}
          />
        </View>
      </View>

      {voltage && current && (
        <View>
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateResistance}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel={t('electricalResistanceCard.calculateButtonA11yLabel')}>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
