import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { TipIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Tips() {
  const { t } = useTranslation();
  const [result, setResult] = useState(t('tipsCard.resultPlaceholder'));
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');

  const calculateTip = (billAmount: number, tipPercentage: number): string => {
    if (billAmount <= 0 || tipPercentage <= 0) {
      return t('tipsCard.errors.positiveValues');
    }

    const tipAmount = billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipAmount;

    return `${t('tipsCard.results.tipAmount')}: ${t('common.currencySymbol')}${Number(tipAmount.toFixed(2))}\n${t('tipsCard.results.totalAmount')}: ${t('common.currencySymbol')}${Number(totalAmount.toFixed(2))}`;
  };

  const handleCalculateTip = () => {
    const b = parseFloat(billAmount);
    const p = parseFloat(tipPercentage);

    if (!billAmount || !tipPercentage) {
      setResult(t('tipsCard.errors.requiredValues'));
      return;
    }

    if (isNaN(b) || isNaN(p)) {
      setResult(t('tipsCard.errors.invalidInput'));
      return;
    }

    setResult(calculateTip(b, p));
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
        title={t('tipsCard.title')}
        icon={<TipIcon size={50} color='#27AE60' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('tipsCard.common.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-80 text-slate-300'
            placeholder={t('tipsCard.placeholders.billAmount')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={billAmount}
            onChangeText={setBillAmount}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-80 text-slate-300'
            placeholder={t('tipsCard.placeholders.tipPercentage')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={tipPercentage}
            onChangeText={setTipPercentage}
            maxLength={5}
          />
        </View>
      </View>

      {billAmount && tipPercentage && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateTip}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('tipsCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
