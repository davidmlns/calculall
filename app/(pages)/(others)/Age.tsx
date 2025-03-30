import { ScrollView, Text, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { AgeIcon, CalculateIcon } from '../../../components/Icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

export default function Age() {
  const { t, i18n } = useTranslation('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showBirthPicker, setShowBirthPicker] = useState(false);
  const [showCurrentPicker, setShowCurrentPicker] = useState(false);

  const scaleValue = new Animated.Value(1);

  const calculateAge = () => {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return t('ageCard.ageResult', { years, months, days });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
        title={t('ageCard.title')}
        icon={<AgeIcon size={50} color='#1ABC9C' />}
      />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('ageCard.yourAge')}
        </Text>

        <View className='mt-8'>
          <Text className='text-gray-300 text-3xl text-center'>{calculateAge()}</Text>
        </View>

        <View className='mt-6'>
          <Text className='text-gray-300 text-xl mb-2 ml-8'>{t('ageCard.birthDate')}</Text>
          <Pressable
            onPress={() => setShowBirthPicker(true)}
            className='bg-gray-800 rounded-2xl p-4 w-72 mx-auto'>
            <Text className='text-slate-300 text-xl text-center'>{formatDate(birthDate)}</Text>
          </Pressable>
          {showBirthPicker && (
            <DateTimePicker
              value={birthDate}
              mode='date'
              display='default'
              onChange={(event, date) => {
                setShowBirthPicker(false);
                if (date) setBirthDate(date);
              }}
            />
          )}
        </View>

        <View className='mt-6'>
          <Text className='text-gray-300 text-xl mb-2 ml-8'>{t('ageCard.currentDate')}</Text>
          <Pressable
            onPress={() => setShowCurrentPicker(true)}
            className='bg-gray-800 rounded-2xl p-4 w-72 mx-auto'>
            <Text className='text-slate-300 text-xl text-center'>{formatDate(currentDate)}</Text>
          </Pressable>
          {showCurrentPicker && (
            <DateTimePicker
              value={currentDate}
              mode='date'
              display='default'
              onChange={(event, date) => {
                setShowCurrentPicker(false);
                if (date) setCurrentDate(date);
              }}
            />
          )}
        </View>

        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => {}}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('ageCard.calculateButtonA11yLabel')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  );
}
