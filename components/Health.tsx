import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { BMIIcon, CaloriesIcon, HydrationIcon, MedicationIcon } from './Icons';

export default function Health() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        title='BMI'
        category='Health'
        icon={<BMIIcon size={52} color='#E74C3C' />}
        route='/(pages)/(health)/BMI'
      />

      <FilterableCard
        title='Calories'
        category='Health'
        icon={<CaloriesIcon size={52} color='#E74C3C' />}
        route='/(pages)/(health)/Calories'
      />

      <FilterableCard
        title='Hydration'
        category='Health'
        icon={<HydrationIcon size={52} color='#E74C3C' />}
        route='/(pages)/(health)/Hydration'
      />

      <FilterableCard
        title='Medication'
        category='Health'
        icon={<MedicationIcon size={52} color='#E74C3C' />}
        route='/(pages)/(health)/Medication'
      />
    </View>
  );
}
