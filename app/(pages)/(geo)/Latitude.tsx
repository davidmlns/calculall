import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { LatitudeIcon } from '../../../components/Icons';
import { useState } from 'react';

export default function Latitude() {
  const [result1, setResult1] = useState('The result will appear here');
  const [result2, setResult2] = useState();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const convertToDMS = (degrees: number, isLatitude: boolean): string => {
    if (degrees < -180 || degrees > 180) return 'Invalid coordinate value';

    const absolute = Math.abs(degrees);
    const degreesOut = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degreesOut) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    const direction = isLatitude ? (degrees >= 0 ? 'N' : 'S') : degrees >= 0 ? 'E' : 'W';

    return `${degreesOut}°${minutes}'${seconds}" ${direction}`;
  };

  const handleCalculateCoordinates = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (!latitude || !longitude) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(lat) || isNaN(lon)) {
      setResult('Invalid input values');
      return;
    }

    const latDMS = convertToDMS(lat, true);
    const lonDMS = convertToDMS(lon, false);
    setResult1(`Latitude: ${latDMS}`);
    setResult2(`Longitude: ${lonDMS}`);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Latitude & Coor.'
        icon={<LatitudeIcon size={52} color='#D35400' />}
      />
      <View className='flex mb-4'>
        <TextInput
          placeholderTextColor='#c7c7c7'
          placeholder='The result will appear here'
          className='bg-gray-800 rounded-lg rounded-b-none p-4 text-2xl flex-wrap  w-96 h-16 mx-auto text-center text-slate-300'
          editable={false}
          selectTextOnFocus={false}
          value={result1}
        />
        <TextInput
          className='bg-gray-800 rounded-lg rounded-t-none p-4 text-2xl flex-wrap  w-96 h-16 mx-auto text-center text-slate-300'
          editable={false}
          selectTextOnFocus={false}
          value={result2}
        />
      </View>

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Latitude (decimal)'
            placeholderTextColor='#cbd5e1'
            keyboardType='numbers-and-punctuation'
            value={latitude}
            onChangeText={setLatitude}
            maxLength={10}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Longitude (decimal)'
            placeholderTextColor='#cbd5e1'
            keyboardType='numbers-and-punctuation'
            value={longitude}
            onChangeText={setLongitude}
            maxLength={10}
          />
        </View>
      </View>

      {latitude && longitude && (
        <View>
          <Pressable
            onPress={handleCalculateCoordinates}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
