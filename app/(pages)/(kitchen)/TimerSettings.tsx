import { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, View, Pressable, Alert, Animated } from 'react-native';
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
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

const TimeControl = ({ label, value, onIncrement, onDecrement }) => (
  <View className='flex items-center mx-2 mb-4'>
    <Text className='text-gray-300 text-xl mb-2'>{label}</Text>
    <View className='flex-row items-center'>
      <Pressable
        onPress={onDecrement}
        className='bg-gray-900 border border-gray-700 rounded-full w-10 h-10 flex justify-center items-center shadow-lg mr-3'>
        <MinusIcon size={20} color='#ffffff' />
      </Pressable>
      <Text className='text-gray-300 text-3xl w-16 text-center'>
        {String(value).padStart(2, '0')}
      </Text>
      <Pressable
        onPress={onIncrement}
        className='bg-gray-900 border border-gray-700 rounded-full w-10 h-10 flex justify-center items-center shadow-lg ml-3'>
        <SumIcon size={20} color='#ffffff' />
      </Pressable>
    </View>
  </View>
);

export default function TimerSettings() {
  const { t } = useTranslation('');
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'timerSettingsCard.granted') {
        Alert.alert(
          t('timerSettingsCard.permissionAlertTitle'),
          t('timerSettingsCard.permissionAlertMessage'),
        );
      }
    };
    requestPermissions();
  }, [t]);

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
        title: t('timerSettingsCard.notificationTitle'),
        body: t('timerSettingsCard.notificationBody'),
        sound: true,
      });
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, time, t]);

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
        title={t('timerSettingsCard.title')}
        icon={<TimerSettingsIcon size={51} color='#F39C12' />}
      />

      <View className='flex items-center mt-6'>
        <Text className='text-gray-300 text-6xl font-bold mb-6'>{formatTime(time)}</Text>

        <View className='flex-row mb-6'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleStartStop}
              className='bg-gray-800 rounded-2xl px-8 py-4 mr-4'
              disabled={time === 0}>
              {isActive ? (
                <PauseIcon size={36} color='#ffffff' />
              ) : (
                <PlayIcon size={36} color='#ffffff' />
              )}
            </Pressable>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleReset}
              className='bg-gray-800 rounded-2xl px-8 py-4'>
              <RestartIcon size={36} color='#ffffff' />
            </Pressable>
          </Animated.View>
        </View>

        <View className='w-full px-8'>
          <TimeControl
            label={t('timerSettingsCard.hoursLabel')}
            value={hours}
            onIncrement={() => setHours(h => Math.min(99, h + 1))}
            onDecrement={() => setHours(h => Math.max(0, h - 1))}
          />
          <TimeControl
            label={t('timerSettingsCard.minutesLabel')}
            value={minutes}
            onIncrement={() => setMinutes(m => (m < 59 ? m + 1 : 0))}
            onDecrement={() => setMinutes(m => (m > 0 ? m - 1 : 59))}
          />
          <TimeControl
            label={t('timerSettingsCard.secondsLabel')}
            value={seconds}
            onIncrement={() => setSeconds(s => (s < 59 ? s + 1 : 0))}
            onDecrement={() => setSeconds(s => (s > 0 ? s - 1 : 59))}
          />

          <View className='flex-row justify-center mt-6'>
            <Pressable
              onPress={() => handlePreset(300)}
              className='bg-gray-800 rounded-2xl px-6 py-3 mx-2'>
              <Text className='text-slate-300 text-lg font-semibold'>
                {t('timerSettingsCard.fiveMin')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePreset(600)}
              className='bg-gray-800 rounded-2xl px-6 py-3 mx-2'>
              <Text className='text-slate-300 text-lg font-semibold'>
                {t('timerSettingsCard.tenMin')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePreset(900)}
              className='bg-gray-800 rounded-2xl px-6 py-3 mx-2'>
              <Text className='text-slate-300 text-lg font-semibold'>
                {t('timerSettingsCard.fifteenMin')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
