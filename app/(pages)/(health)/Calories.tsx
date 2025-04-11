import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  CaloriesIcon,
  CyclingIcon,
  RunningIcon,
  SwimmingIcon,
  WalkingIcon,
  CalculateIcon,
} from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import OptionModalActivities from '../../../components/OptionModalActivities';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

type Activity = {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
};

export default function Calories() {
  const { t } = useTranslation();

  const activities: Activity[] = [
    {
      id: 'walking',
      title: t('caloriesCard.activities.walking.title'),
      icon: <WalkingIcon size={32} color='#E74C3C' />,
      description: t('caloriesCard.activities.walking.description'),
    },
    {
      id: 'running',
      title: t('caloriesCard.activities.running.title'),
      icon: <RunningIcon size={32} color='#E74C3C' />,
      description: t('caloriesCard.activities.running.description'),
    },
    {
      id: 'cycling',
      title: t('caloriesCard.activities.cycling.title'),
      icon: <CyclingIcon size={32} color='#E74C3C' />,
      description: t('caloriesCard.activities.cycling.description'),
    },
    {
      id: 'swimming',
      title: t('caloriesCard.activities.swimming.title'),
      icon: <SwimmingIcon size={32} color='#E74C3C' />,
      description: t('caloriesCard.activities.swimming.description'),
    },
  ];

  const [result, setResult] = useState(t('caloriesCard.resultPlaceholder'));
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectActivity = (id: string) => {
    const activity = activities.find(a => a.id === id);
    if (activity) {
      setSelectedActivity(activity);
      setModalVisible(false);
    }
  };

  const calculateCalories = (weight: number, duration: number, activityId: string): string => {
    if (weight <= 0 || duration <= 0) return t('caloriesCard.errors.positiveValues');

    const MET_VALUES = {
      walking: 3.5,
      running: 7.0,
      cycling: 6.0,
      swimming: 8.0,
    };

    const met = MET_VALUES[activityId as keyof typeof MET_VALUES] || 3.5;
    const calories = (met * weight * duration) / 60;

    return `${Math.round(calories * 100) / 100} ${t('caloriesCard.unit')}`;
  };

  const handleCalculateCalories = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);

    if (!weight || !duration) {
      setResult(t('caloriesCard.errors.enterBothValues'));
      return;
    }

    if (isNaN(w) || isNaN(d)) {
      setResult(t('caloriesCard.errors.invalidInput'));
      return;
    }

    setResult(calculateCalories(w, d, selectedActivity.id));
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('caloriesCard.title')}
          icon={<CaloriesIcon size={56} color='#E74C3C' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex w-95 mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('caloriesCard.common.values')}
        </Text>

        <OptionModalActivities
          title={selectedActivity.title}
          description={selectedActivity.description}
          icon={selectedActivity.icon}
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onOpen={() => setModalVisible(true)}>
          <View className='space-y-2 mt-2 flex'>
            {activities.map(activity => (
              <Pressable
                key={activity.id}
                onPress={() => handleSelectActivity(activity.id)}
                className={`p-3 rounded-lg ${selectedActivity.id === activity.id ? 'bg-primary' : 'bg-background-secondary'} flex-row items-center`}>
                <View className='mr-3 bg-icon-background w-10 h-10 rounded-lg flex items-center justify-center'>
                  {activity.icon}
                </View>
                <View>
                  <Text className='text-white text-base font-Satoshi'>{activity.title}</Text>
                  <Text className='text-slate-400 text-sm font-Satoshi'>
                    {activity.description}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </OptionModalActivities>

        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('caloriesCard.placeholders.weight')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={weight}
            onChangeText={setWeight}
            maxLength={9}
          />
        </View>
        <View className='mt-4 w-95 mx-auto'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-full text-slate-300'
            placeholder={t('caloriesCard.placeholders.duration')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={duration}
            onChangeText={setDuration}
            maxLength={9}
          />
        </View>
      </View>

      {weight && duration && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateCalories}
              className='rounded-2xl mx-auto'
              accessibilityLabel={t('caloriesCard.common.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
