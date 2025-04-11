import { ScrollView, Text, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DateIcon } from '../../../components/Icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

const DatePickerButton = ({ date, onPress, label, formatDate }) => (
  <View className='mt-4'>
    <Text className='text-gray-300 text-2xl mb-2 font-Satoshi text-center'>{label}</Text>
    <Pressable onPress={onPress} className='bg-gray-800 rounded-2xl p-4 w-72 mx-auto'>
      <Text className='text-slate-300 text-xl text-center font-Satoshi'>{formatDate(date)}</Text>
    </Pressable>
  </View>
);

export default function DateCalculator() {
  const { t, i18n } = useTranslation('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [unit, setUnit] = useState('age');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateDifference = (startDate: Date, endDate: Date, unit: string) => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    switch (unit) {
      case 'days':
        return t('dateCalculatorCard.daysResult', { days: daysDiff || 0 });
      case 'weeks':
        return t('dateCalculatorCard.weeksResult', { weeks: Math.floor(daysDiff / 7) || 0 });
      case 'months':
        const months =
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          (endDate.getMonth() - startDate.getMonth());
        return t('dateCalculatorCard.monthsResult', { months: months || 0 });
      case 'years':
        return t('dateCalculatorCard.yearsResult', {
          years: endDate.getFullYear() - startDate.getFullYear() || 0,
        });
      default:
        return calculateAge(startDate, endDate);
    }
  };

  const calculateAge = (birthDate: Date, currentDate: Date) => {
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

    return t('dateCalculatorCard.ageResult', { years, months, days });
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('dateCalculatorCard.title')}
          icon={<DateIcon size={50} color='#1ABC9C' />}
        />
      </View>

      <View className='flex mx-auto px-4'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>
          {t('dateCalculatorCard.calculatorTitle')}
        </Text>

        <View className='mt-8'>
          <Text className='text-gray-300 text-3xl font-Satoshi text-center'>
            {calculateDifference(startDate, endDate, unit)}
          </Text>
        </View>

        <DatePickerButton
          date={startDate}
          onPress={() => setShowStartPicker(true)}
          label={t('dateCalculatorCard.startDateLabel')}
          formatDate={formatDate}
        />
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode='date'
            display='default'
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date) setStartDate(date);
            }}
          />
        )}

        <DatePickerButton
          date={endDate}
          onPress={() => setShowEndPicker(true)}
          label={t('dateCalculatorCard.endDateLabel')}
          formatDate={formatDate}
        />
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode='date'
            display='default'
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date) setEndDate(date);
            }}
          />
        )}

        <View className='mt-6'>
          <Text className='text-gray-300 text-2xl font-Satoshi mb-4 text-center'>
            {t('dateCalculatorCard.calculateInLabel')}
          </Text>
          <View className='flex-row flex-wrap justify-center gap-2'>
            <Pressable
              onPress={() => setUnit('age')}
              className={`px-6 py-3 rounded-2xl ${unit === 'age' ? 'bg-gray-500' : 'bg-gray-700'}`}>
              <Text className='text-slate-300 text-xl font-Satoshi font-semibold'>
                {t('dateCalculatorCard.ageOption')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setUnit('days')}
              className={`px-6 py-3 rounded-2xl ${unit === 'days' ? 'bg-gray-500' : 'bg-gray-700'}`}>
              <Text className='text-slate-300 text-xl font-Satoshi font-semibold'>
                {t('dateCalculatorCard.daysOption')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setUnit('weeks')}
              className={`px-6 py-3 rounded-2xl ${unit === 'weeks' ? 'bg-gray-500' : 'bg-gray-700'}`}>
              <Text className='text-slate-300 text-xl font-Satoshi font-semibold'>
                {t('dateCalculatorCard.weeksOption')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setUnit('months')}
              className={`px-6 py-3 rounded-2xl ${unit === 'months' ? 'bg-gray-500' : 'bg-gray-700'}`}>
              <Text className='text-slate-300 text-xl font-Satoshi font-semibold'>
                {t('dateCalculatorCard.monthsOption')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setUnit('years')}
              className={`px-6 py-3 rounded-2xl ${unit === 'years' ? 'bg-gray-500' : 'bg-gray-700'}`}>
              <Text className='text-slate-300 text-xl font-Satoshi font-semibold'>
                {t('dateCalculatorCard.yearsOption')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
