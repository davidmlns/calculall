import { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, View, Pressable, Alert } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  TimerSettingsIcon,
  PlayIcon,
  PauseIcon,
  RestartIcon,
  SumIcon,
  MinusIcon,
} from '../../../components/Icons';
import * as Notifications from 'expo-notifications';

const TimeControl = ({ label, value, onIncrement, onDecrement }) => (
  <View className='flex items-center mx-2'>
    <Text className='text-gray-300 text-lg mb-2'>{label}</Text>
    <View className='flex-row items-center'>
      <Pressable
        onPress={onDecrement}
        className='bg-icon-background rounded-full w-10 h-10 justify-center items-center'>
        <MinusIcon size={24} color='#000000' />
      </Pressable>
      <Text className='text-gray-300 text-3xl mx-4 w-12 text-center'>
        {String(value).padStart(2, '0')}
      </Text>
      <Pressable
        onPress={onIncrement}
        className='bg-icon-background rounded-full w-10 h-10 justify-center items-center'>
        <SumIcon size={24} color='#000000' />
      </Pressable>
    </View>
  </View>
);

export default function TimerSettings() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable notifications to use the timer');
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    setTime(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (isActive && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      Notifications.presentNotificationAsync({
        title: 'Timer Complete!',
        body: 'Your timer has finished.',
        sound: true,
      });
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (time > 0) {
      setIsActive(!isActive);
    }
  };

  const handleReset = async () => {
    setTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const handlePreset = (presetSeconds: number) => {
    const h = Math.floor(presetSeconds / 3600);
    const m = Math.floor((presetSeconds % 3600) / 60);
    const s = presetSeconds % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Timer Settings'
        icon={<TimerSettingsIcon size={52} color='#F39C12' />}
      />

      <View className='flex items-center mt-10'>
        <Text className='text-gray-300 text-6xl font-bold'>{formatTime(time)}</Text>

        <View className='flex-row mt-8 space-x-4'>
          <Pressable
            onPress={handleStartStop}
            className='bg-icon-background rounded-full px-6 py-3 justify-center items-center mr-5'
            disabled={time === 0}>
            {isActive ? (
              <PauseIcon size={36} color='#000000' />
            ) : (
              <PlayIcon size={36} color='#000000' />
            )}
          </Pressable>
          <Pressable onPress={handleReset} className='bg-icon-background rounded-full px-6 py-3'>
            <RestartIcon size={36} color='#000000' />
          </Pressable>
        </View>

        <View className='mt-8'>
          <View className='flex-col justify-center'>
            <TimeControl
              label='Hours'
              value={hours}
              onIncrement={() => setHours(h => Math.min(99, h + 1))}
              onDecrement={() => setHours(h => Math.max(0, h - 1))}
            />
            <TimeControl
              label='Minutes'
              value={minutes}
              onIncrement={() => setMinutes(m => (m < 59 ? m + 1 : 0))}
              onDecrement={() => setMinutes(m => (m > 0 ? m - 1 : 59))}
            />
            <TimeControl
              label='Seconds'
              value={seconds}
              onIncrement={() => setSeconds(s => (s < 59 ? s + 1 : 0))}
              onDecrement={() => setSeconds(s => (s > 0 ? s - 1 : 59))}
            />
          </View>

          <View className='flex-row justify-center mt-6 space-x-4'>
            <Pressable
              onPress={() => handlePreset(300)}
              className='bg-icon-background rounded-xl px-4 py-2 mr-4 ml-4'>
              <Text className='text-slate-800 text-lg'>5 Min</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePreset(600)}
              className='bg-icon-background rounded-xl px-4 py-2 mr-4 ml-4'>
              <Text className='text-slate-800 text-lg'>10 Min</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePreset(900)}
              className='bg-icon-background rounded-xl px-4 py-2 mr-4 ml-4'>
              <Text className='text-slate-800 text-lg'>15 Min</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
