import { ScrollView, Text, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { AgeIcon } from '../../../components/Icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Age() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showBirthPicker, setShowBirthPicker] = useState(false);
  const [showCurrentPicker, setShowCurrentPicker] = useState(false);

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

    return `${years} years, ${months} months, ${days} days`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Age Calculator' icon={<AgeIcon size={52} color='#1ABC9C' />} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Your Age</Text>

        <View className='mt-8'>
          <Text className='text-gray-300 text-3xl text-center'>{calculateAge()}</Text>
        </View>

        <View className='mt-8'>
          <Text className='text-gray-300 text-xl mb-2'>Birth Date</Text>
          <Pressable
            onPress={() => setShowBirthPicker(true)}
            className='bg-gray-800 rounded-lg p-4'>
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
          <Text className='text-gray-300 text-xl mb-2'>Current Date</Text>
          <Pressable
            onPress={() => setShowCurrentPicker(true)}
            className='bg-gray-800 rounded-lg p-4'>
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
      </View>
    </ScrollView>
  );
}
