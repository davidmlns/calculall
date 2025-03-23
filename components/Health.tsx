import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { BMIIcon, CaloriesIcon, HydrationIcon, MedicationIcon } from './Icons';

export default function Health() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='BMI'
        title='BMI'
        category='Health'
        icon={<BMIIcon size={52} color='#E74C3C' />}
        route='/(pages)/(health)/BMI'
      />

      <FilterableCard
        id='Calories'
        title='Calories'
        category='Health'
        icon={<CaloriesIcon size={52} color='#E74C3C' />}
        route='/(pages)/(health)/Calories'
      />

      <FilterableCard
        id='Hydration'
        title='Hydration'
        category='Health'
        icon={<HydrationIcon size={52} color='#E74C3C' />}
        route='/(pages)/(health)/Hydration'
      />

      <FilterableCard
        id='Medication'
        title='Medication'
        category='Health'
        icon={<MedicationIcon size={52} color='#E74C3C' />}
        route='/(pages)/(health)/Medication'
      />
    </View>
  );
}
