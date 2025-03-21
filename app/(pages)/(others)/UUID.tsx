import { ScrollView, Text, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CopyIcon, UUIDIcon, GenerateIcon } from '../../../components/Icons';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

function generateSimpleUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState(`${generateSimpleUuid()}`);

  const generateUuid = () => {
    setUuid(generateSimpleUuid());
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  const scaleValue = new Animated.Value(1);

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
      <HeaderDescriptionPage title='UUID Generator' icon={<UUIDIcon size={52} color='#1ABC9C' />} />

      <View className='flex mt-6 mx-auto px-4 w-98'>
        <View className='bg-gray-800 rounded-2xl p-6'>
          {uuid && (
            <View className='items-center'>
              <Text className='text-slate-300 text-xl break-all text-center'>{uuid}</Text>
              <Pressable
                onPress={() => copyToClipboard(uuid)}
                className='mt-4 flex-row items-center'>
                <CopyIcon size={24} color='#ffffff' />
                <Text className='text-slate-300 text-lg ml-2'>Copy UUID</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={generateUuid}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel='Generate Button'>
              <GenerateIcon size={54} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  );
}
