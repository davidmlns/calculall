import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { VelocityIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Velocity() {
  const { t } = useTranslation();

  const [result, setResult] = useState(t('velocityCard.defaultResult'));
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');

  const calculateVelocity = (distance: number, time: number): string => {
    if (isNaN(distance) || distance <= 0) return t('velocityCard.errors.positiveDistance');
    if (isNaN(time) || time <= 0) return t('velocityCard.errors.positiveTime');
    return t('velocityCard.result', { value: (distance / time).toFixed(2) });
  };

  const handleCalculateVelocity = () => {
    const dist = parseFloat(distance);
    const t = parseFloat(time);
    if (isNaN(dist) || isNaN(t)) {
      setResult(t('velocityCard.errors.enterAllValues'));
      return;
    }
    setResult(calculateVelocity(dist, t));
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
          title={t('velocityCard.title')}
          icon={<VelocityIcon size={54} color='#2E86C1' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('velocityCard.values')}
        </Text>

        <View className='mt-2 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('velocityCard.distancePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={distance}
            onChangeText={text => setDistance(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('velocityCard.timePlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={time}
            onChangeText={text => setTime(text.replace(/[^0-9.]/g, ''))}
            maxLength={9}
          />
        </View>
      </View>

      {distance && time && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateVelocity}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('velocityCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
