import { ScrollView, Text, View, TextInput, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CurrencyIcon, CalculateIcon } from '../../../components/Icons';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

export default function Currency() {
  const { t } = useTranslation('');
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const scaleValue = new Animated.Value(1);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];

  const fetchExchangeRate = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      setExchangeRate(data.rates[toCurrency]);
    } catch (err) {
      setError(t('fetchError'));
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    const amountNum = parseFloat(amount);
    if (!isNaN(amountNum)) {
      setConvertedAmount(amountNum * exchangeRate);
    }
  }, [amount, exchangeRate]);

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('currencyCard.title')}
          icon={<CurrencyIcon size={52} color='#1ABC9C' />}
        />
      </View>

      <View className='flex mt-6 mx-auto px-4 w-96'>
        <View className='bg-gray-800 rounded-lg p-4'>
          <TextInput
            className='bg-gray-700 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300 font-Satoshi'
            placeholder={t('currencyCard.amountPlaceholder')}
            placeholderTextColor='#cbd5e1'
            value={amount}
            onChangeText={setAmount}
            keyboardType='numeric'
            maxLength={9}
          />

          <View className='flex-row justify-between mb-4'>
            <View className='flex-1 mr-2'>
              <Text className='text-gray-300 text-lg font-Satoshi mb-2'>
                {t('currencyCard.fromLabel')}
              </Text>
              <View className='bg-gray-700 border border-gray-600 font-Satoshi rounded-lg'>
                <Picker
                  selectedValue={fromCurrency}
                  onValueChange={setFromCurrency}
                  style={{ color: '#cbd5e1' }}
                  dropdownIconColor='#cbd5e1'>
                  {currencies.map(currency => (
                    <Picker.Item
                      key={currency}
                      label={t(`currencyCard.currencies.${currency}`)}
                      value={currency}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View className='flex-1 ml-2'>
              <Text className='text-gray-300 text-lg font-Satoshi mb-2'>
                {t('currencyCard.toLabel')}
              </Text>
              <View className='bg-gray-700 border border-gray-600 font-Satoshi rounded-lg'>
                <Picker
                  selectedValue={toCurrency}
                  onValueChange={setToCurrency}
                  style={{ color: '#cbd5e1' }}
                  dropdownIconColor='#cbd5e1'>
                  {currencies.map(currency => (
                    <Picker.Item
                      key={currency}
                      label={t(`currencyCard.currencies.${currency}`)}
                      value={currency}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          {isLoading ? (
            <Text className='text-slate-300 text-xl text-center'>{t('currencyCard.loading')}</Text>
          ) : error ? (
            <Text className='text-red-500 text-xl text-center'>{error}</Text>
          ) : (
            <Text className='text-slate-300 text-3xl text-center font-Satoshi'>
              {convertedAmount.toFixed(2)} {toCurrency}
            </Text>
          )}
        </View>
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={fetchExchangeRate}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('currencyCard.calculateButtonA11yLabel')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  );
}
