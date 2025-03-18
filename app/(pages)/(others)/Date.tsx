import { ScrollView, Text, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DateIcon } from '../../../components/Icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerButton = ({ date, onPress, label }) => (
  <View className='mt-4'>
    <Text className='text-gray-300 text-xl mb-2'>{label}</Text>
    <Pressable onPress={onPress} className='bg-gray-800 rounded-lg p-4'>
      <Text className='text-slate-300 text-xl text-center'>{formatDate(date)}</Text>
    </Pressable>
  </View>
);

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
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
      return `${daysDiff} days`;
    case 'weeks':
      return `${Math.floor(daysDiff / 7)} weeks`;
    case 'months':
      const months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());
      return `${months} months`;
    case 'years':
      return `${endDate.getFullYear() - startDate.getFullYear()} years`;
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

  return `${years} years, ${months} months, ${days} days`;
};

export default function DateCalculator() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [unit, setUnit] = useState('age');

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Date' icon={<DateIcon size={52} color='#1ABC9C' />} />

      <View className='flex mt-6 mx-auto px-4'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Date Calculator</Text>

        <View className='mt-8'>
          <Text className='text-gray-300 text-3xl text-center'>
            {calculateDifference(startDate, endDate, unit)}
          </Text>
        </View>

        <DatePickerButton
          date={startDate}
          onPress={() => setShowStartPicker(true)}
          label='Start Date'
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

        <DatePickerButton date={endDate} onPress={() => setShowEndPicker(true)} label='End Date' />
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
          <Text className='text-gray-300 text-xl mb-2'>Calculate in:</Text>
          <View className='flex-row flex-wrap justify-center gap-4'>
            <Pressable
              onPress={() => setUnit('age')}
              className={`px-4 py-2 mr-4 ml-4 rounded-lg ${unit === 'age' ? 'bg-green-600' : 'bg-gray-700'}`}>
              <Text className='text-white text-xl font-bold'>Age</Text>
            </Pressable>
            <Pressable
              onPress={() => setUnit('days')}
              className={`px-4 py-2 mr-4 ml-4 rounded-lg ${unit === 'days' ? 'bg-green-600' : 'bg-gray-700'}`}>
              <Text className='text-white text-xl font-bold'>Days</Text>
            </Pressable>
            <Pressable
              onPress={() => setUnit('weeks')}
              className={`px-4 py-2 mr-4 ml-4 rounded-lg ${unit === 'weeks' ? 'bg-green-600' : 'bg-gray-700'}`}>
              <Text className='text-white text-xl font-bold'>Weeks</Text>
            </Pressable>
            <Pressable
              onPress={() => setUnit('months')}
              className={`px-4 py-2 mr-4 ml-4 rounded-lg ${unit === 'months' ? 'bg-green-600' : 'bg-gray-700'}`}>
              <Text className='text-white text-xl font-bold'>Months</Text>
            </Pressable>
            <Pressable
              onPress={() => setUnit('years')}
              className={`px-4 py-2 mr-4 ml-4 rounded-lg ${unit === 'years' ? 'bg-green-600' : 'bg-gray-700'}`}>
              <Text className='text-white text-xl font-bold'>Years</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
