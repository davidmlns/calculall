import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { AutonomyIcon, CO2Icon, FuelIcon, MileageIcon } from './Icons';

export default function Transport() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Autonomy'
        title='Autonomy '
        category='Transport'
        icon={<AutonomyIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Autonomy'
      />

      <FilterableCard
        id='CO2'
        title='CO₂ Emissions'
        category='Transport'
        icon={<CO2Icon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/CO2'
      />
      <FilterableCard
        id='Fuel'
        title='Fuel '
        category='Transport'
        icon={<FuelIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Fuel'
      />

      <FilterableCard
        id='Mileage'
        title='Mileage '
        category='Transport'
        icon={<MileageIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Mileage'
      />
    </View>
  );
}
