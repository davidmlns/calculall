import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { LatitudeIcon, CalculateIcon } from '../../../components/Icons';
import { useState } from 'react';

export default function Latitude() {
  const [result1, setResult1] = useState('The result will appear here');
  const [result2, setResult2] = useState();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const convertToDMS = (degrees: number, isLatitude: boolean): string => {
    if (degrees < -180 || degrees > 180) return 'Invalid value';

    const absolute = Math.abs(degrees);
    const degreesOut = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degreesOut) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    const direction = isLatitude ? (degrees >= 0 ? 'N' : 'S') : degrees >= 0 ? 'E' : 'W';

    return `${degreesOut}°${minutes}'${seconds}" ${direction}`;
  };

  const scaleValue = new Animated.Value(1);

  const handleCalculateCoordinates = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (!latitude || !longitude) {
      setResult1('Please enter required values');
      return;
    }

    if (isNaN(lat) || isNaN(lon)) {
      setResult1('Invalid input values');
      return;
    }

    const latDMS = convertToDMS(lat, true);
    const lonDMS = convertToDMS(lon, false);
    setResult1(`Latitude: ${latDMS}`);
    setResult2(`Longitude: ${lonDMS}`);
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
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
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
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
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
          <View className='mt-5'>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleCalculateCoordinates}
                className='rounded-2xl mx-auto mb-10'
                accessibilityLabel='Calculate Button'>
                <CalculateIcon size={58} color='white' />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
