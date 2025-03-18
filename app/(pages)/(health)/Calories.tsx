import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  CaloriesIcon,
  CyclingIcon,
  RunningIcon,
  SwimmingIcon,
  WalkingIcon,
} from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import OptionModalActivities from '../../../components/OptionModalActivities';

type Activity = {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
};

const activities: Activity[] = [
  {
    id: 'walking',
    title: 'Walking',
    icon: <WalkingIcon size={32} color='#E74C3C' />,
    description: 'Low intensity activity',
  },
  {
    id: 'running',
    title: 'Running',
    icon: <RunningIcon size={32} color='#E74C3C' />,
    description: 'High intensity activity',
  },
  {
    id: 'cycling',
    title: 'Cycling',
    icon: <CyclingIcon size={32} color='#E74C3C' />,
    description: 'Moderate intensity activity',
  },
  {
    id: 'swimming',
    title: 'Swimming',
    icon: <SwimmingIcon size={32} color='#E74C3C' />,
    description: 'Full body workout',
  },
];

export default function Calories() {
  const [result, setResult] = useState('The result will appear here');
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
    if (weight <= 0 || duration <= 0) return 'Values must be positive';

    const MET_VALUES = {
      walking: 3.5,
      running: 7.0,
      cycling: 6.0,
      swimming: 8.0,
    };

    const met = MET_VALUES[activityId as keyof typeof MET_VALUES] || 3.5;
    const calories = (met * weight * duration) / 60;

    return `${Math.round(calories * 100) / 100} calories`;
  };

  const handleCalculateCalories = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);

    if (!weight || !duration) {
      setResult('Please enter both values');
      return;
    }

    if (isNaN(w) || isNaN(d)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateCalories(w, d, selectedActivity.id));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Calories' icon={<CaloriesIcon size={58} color='#E74C3C' />} />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter weight (kg)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={weight}
            onChangeText={setWeight}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
            placeholder='Enter duration (minutes)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={duration}
            onChangeText={setDuration}
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

      {weight && duration && (
        <View>
          <Pressable
            onPress={handleCalculateCalories}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
