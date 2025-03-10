import { View } from 'react-native';
import Card from './Card';
import { BMIIcon, CaloriesIcon, HydrationIcon, MedicationIcon } from './Icons';

export default function Health() {
  return (
    <View className='mt-6 flex-row flex-wrap justify-around'>
      <Card title='BMI' category='Health' icon={<BMIIcon size={44} color='#E74C3C' />} route='/' />

      <Card
        title='Calories'
        category='Health'
        icon={<CaloriesIcon size={44} color='#E74C3C' />}
        route='/'
      />

      <Card
        title='Hydration'
        category='Health'
        icon={<HydrationIcon size={44} color='#E74C3C' />}
        route='/'
      />

      <Card
        title='Medication'
        category='Health'
        icon={<MedicationIcon size={44} color='#E74C3C' />}
        route='/'
      />
    </View>
  );
}
