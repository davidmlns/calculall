import { ScrollView, Text, View, Pressable, TextInput, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CopyIcon, QrCodeIcon, GenerateIcon } from '../../../components/Icons';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';

export default function QrCode() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');

  const generateQrCode = () => {
    if (!text.trim()) {
      setQrValue('');
      return;
    }
    setQrValue(text);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(qrValue);
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
      <HeaderDescriptionPage
        title='QR Code Generator'
        icon={<QrCodeIcon size={52} color='#1ABC9C' />}
      />

      <View className='flex mt-6 mx-auto px-4 w-95'>
        <View className='bg-gray-800 rounded-lg p-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Enter text or URL'
            placeholderTextColor='#cbd5e1'
            value={text}
            onChangeText={setText}
            maxLength={256}
          />
          {qrValue && (
            <View className='items-center mt-4'>
              <QRCode value={qrValue} size={200} color='#1ABC9C' backgroundColor='transparent' />
              <Pressable onPress={copyToClipboard} className='mt-4 flex-row items-center'>
                <CopyIcon size={24} color='#ffffff' />
                <Text className='text-slate-300 text-lg ml-2'>Copy QR Code Content</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={generateQrCode}
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
