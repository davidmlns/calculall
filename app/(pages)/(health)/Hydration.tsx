import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  HydrationIcon,
  WalkingIcon,
  RunningIcon,
  CyclingIcon,
  CalculateIcon,
} from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import React, { useState } from 'react';
import OptionModalActivities from '../../../components/OptionModalActivities';

const scaleValue = new Animated.Value(1);

type Activity = {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
};

const ACTIVITY_FACTORS = {
  sedentary: 30,
  moderate: 35,
  active: 40,
};

const activities: Activity[] = [
  {
    id: 'sedentary',
    title: 'Sedentary',
    icon: <WalkingIcon size={32} color='#E74C3C' />,
    description: 'Little or no exercise',
  },
  {
    id: 'moderate',
    title: 'Moderate',
    icon: <CyclingIcon size={32} color='#E74C3C' />,
    description: 'Moderate exercise 3-5 days/week',
  },
  {
    id: 'active',
    title: 'Active',
    icon: <RunningIcon size={32} color='#E74C3C' />,
    description: 'Intense exercise 6-7 days/week',
  },
];

export default function Hydration() {
  const [result, setResult] = useState('The result will appear here');
  const [weight, setWeight] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(activities[1]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectActivity = (id: string) => {
    const activity = activities.find(a => a.id === id);
    if (activity) {
      setSelectedActivity(activity);
      setModalVisible(false);
    }
  };

  const calculateWaterIntake = (weight: number, activityId: string): string => {
    if (weight <= 0) return 'Weight must be positive';

    const factor = ACTIVITY_FACTORS[activityId as keyof typeof ACTIVITY_FACTORS] || 35;
    const waterIntake = (weight * factor) / 1000;

    return `${Math.round(waterIntake * 100) / 100} liters`;
  };

  const handleCalculateHydration = () => {
    const w = parseFloat(weight);

    if (!weight) {
      setResult('Please enter your weight');
      return;
    }

    if (isNaN(w)) {
      setResult('Invalid input value');
      return;
    }

    setResult(calculateWaterIntake(w, selectedActivity.id));
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
      <HeaderDescriptionPage title='Hydration' icon={<HydrationIcon size={52} color='#E74C3C' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 text-center text-2xl w-72 text-slate-300 mx-auto'
            placeholder='Enter weight (kg)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={weight}
            onChangeText={setWeight}
            maxLength={9}
          />
        </View>
        <OptionModalActivities
          title={selectedActivity.title}
          description={selectedActivity.description}
          icon={selectedActivity.icon}
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onOpen={() => setModalVisible(true)}>
          <View className='space-y-2 flex'>
            {activities.map(activity => (
              <Pressable
                key={activity.id}
                onPress={() => handleSelectActivity(activity.id)}
                className={`p-3 rounded-lg ${selectedActivity.id === activity.id ? 'bg-primary' : 'bg-background-secondary'} flex-row items-center`}>
                <View className='mr-3 bg-icon-background w-10 h-10 rounded-lg flex items-center justify-center'>
                  {activity.icon}
                </View>
                <View>
                  <Text className='text-white text-base'>{activity.title}</Text>
                  <Text className='text-slate-400 text-sm'>{activity.description}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </OptionModalActivities>
      </View>

      {weight && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateHydration}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel='Calculate Button'>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
