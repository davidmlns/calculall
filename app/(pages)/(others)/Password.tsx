import { ScrollView, Text, View, Pressable, Switch, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { CopyIcon, PasswordIcon, GenerateIcon } from '../../../components/Icons';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

export default function Password() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

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

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{};:,.<>?';

    let characters = '';
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (!characters.length) {
      setPassword('Select at least one character type');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(password);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Password Generator'
        icon={<PasswordIcon size={51} color='#1ABC9C' />}
      />

      <View className='flex mt-6 mx-auto px-4 w-98'>
        <View className='bg-gray-800 rounded-2xl p-6 w-98'>
          <Text selectable className='text-slate-300 text-2xl text-center mb-4'>
            {password}
          </Text>
          <Pressable onPress={copyToClipboard} className='flex-row justify-end'>
            <CopyIcon size={24} color='#ffffff' />
          </Pressable>
        </View>

        <View className='mt-6'>
          <Text className='text-gray-300 text-xl mb-4 text-center'>Password Length: {length}</Text>
          <View className='flex-row items-center px-4'>
            <Text className='text-gray-300 text-lg mr-2'>8</Text>
            <View className='flex-1'>
              <Slider
                minimumValue={8}
                maximumValue={32}
                step={1}
                value={length}
                onValueChange={setLength}
                minimumTrackTintColor='#1ABC9C'
                maximumTrackTintColor='#4B5563'
                thumbTintColor='#1ABC9C'
              />
            </View>
            <Text className='text-gray-300 text-lg ml-2'>32</Text>
          </View>
        </View>

        <View className='mt-6 bg-gray-800 rounded-2xl p-4'>
          <View className='flex-row justify-between items-center py-2'>
            <Text className='text-gray-300 text-xl'>Uppercase Letters</Text>
            <Switch
              value={includeUppercase}
              onValueChange={setIncludeUppercase}
              trackColor={{ false: '#4B5563', true: '#1ABC9C' }}
              thumbColor='#FFFFFF'
            />
          </View>
          <View className='flex-row justify-between items-center py-2'>
            <Text className='text-gray-300 text-xl'>Lowercase Letters</Text>
            <Switch
              value={includeLowercase}
              onValueChange={setIncludeLowercase}
              trackColor={{ false: '#4B5563', true: '#1ABC9C' }}
              thumbColor='#FFFFFF'
            />
          </View>
          <View className='flex-row justify-between items-center py-2'>
            <Text className='text-gray-300 text-xl'>Numbers</Text>
            <Switch
              value={includeNumbers}
              onValueChange={setIncludeNumbers}
              trackColor={{ false: '#4B5563', true: '#1ABC9C' }}
              thumbTintColor='#FFFFFF'
            />
          </View>
          <View className='flex-row justify-between items-center py-2'>
            <Text className='text-gray-300 text-xl'>Special Characters</Text>
            <Switch
              value={includeSymbols}
              onValueChange={setIncludeSymbols}
              trackColor={{ false: '#4B5563', true: '#1ABC9C' }}
              thumbColor='#FFFFFF'
            />
          </View>
        </View>

        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={generatePassword}
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
