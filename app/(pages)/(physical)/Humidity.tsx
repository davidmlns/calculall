import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { HumidityIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';
import { useTranslation } from 'react-i18next';

type HumidityOperation = 'rel-hum' | 'abs-hum';

const calculateSaturationVaporPressure = (temperature: number) => {
  return 6.112 * Math.exp((17.67 * temperature) / (temperature + 243.5));
};

export default function Humidity() {
  const { t } = useTranslation();

  const operations: Operation[] = [
    {
      id: 'rel-hum',
      title: t('humidityCard.operations.relative.title'),
      icon: <HumidityIcon size={32} color='#2E86C1' />,
      description: '100%',
    },
    {
      id: 'abs-hum',
      title: t('humidityCard.operations.absolute.title'),
      icon: <HumidityIcon size={32} color='#2E86C1' />,
      description: '100%',
    },
  ];

  const [result, setResult] = useState(t('humidityCard.defaultResult'));
  const [selectedOperation, setSelectedOperation] = useState<HumidityOperation>('rel-hum');
  const [valueDewPointTextInputValues, setValueDewPointTextInputValues] = useState('');
  const [valueTemperatureTextInputValues, setValueTemperatureTextInputValues] = useState('');
  const [valueRHTextInputValues, setValueRHTextInputValues] = useState('');

  const scaleValue = new Animated.Value(1);

  const handleCalculate = (selectedOperation: HumidityOperation) => {
    const T = parseFloat(valueTemperatureTextInputValues);

    if (!valueTemperatureTextInputValues) {
      setResult(t('humidityCard.errors.enterTemperature'));
      return;
    }

    if (isNaN(T)) {
      setResult(t('humidityCard.errors.invalidTemperature'));
      return;
    }

    switch (selectedOperation) {
      case 'rel-hum': {
        const Td = parseFloat(valueDewPointTextInputValues);
        if (isNaN(Td)) {
          setResult(t('humidityCard.errors.invalidDewPoint'));
          return;
        }
        const es = calculateSaturationVaporPressure(T);
        const e = calculateSaturationVaporPressure(Td);
        const RH = (e / es) * 100;
        setResult(t('humidityCard.result.relative', { value: RH.toFixed(2) }));
        break;
      }
      case 'abs-hum': {
        const RH = parseFloat(valueRHTextInputValues);
        if (isNaN(RH)) {
          setResult(t('humidityCard.errors.invalidHumidity'));
          return;
        }
        const es = calculateSaturationVaporPressure(T);
        const e = (RH / 100) * es;
        const absHum = (e * 0.000622) / (T + 273.15);
        setResult(t('humidityCard.result.absolute', { value: absHum.toFixed(2) }));
        break;
      }
    }
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
          title={t('humidityCard.title')}
          icon={<HumidityIcon size={54} color='#2E86C1' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
        <CalculateComponent
          operations={operations}
          onCalculate={handleCalculate}
          onSendOperation={setSelectedOperation}
        />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 font-Satoshi text-2xl font-semibold text-center'>
          {t('humidityCard.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('humidityCard.temperaturePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTemperatureTextInputValues}
            onChangeText={setValueTemperatureTextInputValues}
            maxLength={9}
          />
        </View>
        {selectedOperation === 'rel-hum' && (
          <View className='mt-4 w-95 mx-auto'>
            <TextInput
              className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
              placeholder={t('humidityCard.dewPointPlaceholder')}
              placeholderTextColor='#cbd5e1'
              keyboardType='number-pad'
              value={valueDewPointTextInputValues}
              onChangeText={setValueDewPointTextInputValues}
              maxLength={9}
            />
          </View>
        )}
        {selectedOperation === 'abs-hum' && (
          <View className='mt-4 w-95 mx-auto'>
            <TextInput
              className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
              placeholder={t('humidityCard.humidityPlaceholder')}
              placeholderTextColor='#cbd5e1'
              keyboardType='number-pad'
              value={valueRHTextInputValues}
              onChangeText={setValueRHTextInputValues}
              maxLength={6}
            />
          </View>
        )}
      </View>

      {valueTemperatureTextInputValues && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => handleCalculate(selectedOperation)}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('humidityCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
