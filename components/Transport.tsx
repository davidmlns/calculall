import { View } from 'react-native';
import Card from './Card';
import { AutonomyIcon, CO2Icon, FuelIcon, MileageIcon, TirePressureIcon } from './Icons';

export default function Transport() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <Card
        title='Autonomy '
        category='Transport'
        icon={<AutonomyIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Autonomy'
      />

      <Card
        title='CO₂ Emissions'
        category='Transport'
        icon={<CO2Icon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/CO2'
      />
      <Card
        title='Fuel '
        category='Transport'
        icon={<FuelIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Fuel'
      />

      <Card
        title='Mileage '
        category='Transport'
        icon={<MileageIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Mileage'
      />
    </View>
  );
}
