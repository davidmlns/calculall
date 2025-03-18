import { View } from 'react-native';
import Card from './Card';
import { AutonomyIcon, FuelIcon, MileageIcon, TirePressureIcon } from './Icons';

export default function Transport() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <Card
        title='Autonomy '
        category='Transport'
        icon={<AutonomyIcon size={44} color='#7F8C8D' />}
        route='/'
      />

      <Card
        title='Fuel '
        category='Transport'
        icon={<FuelIcon size={44} color='#7F8C8D' />}
        route='/'
      />

      <Card
        title='Mileage '
        category='Transport'
        icon={<MileageIcon size={44} color='#7F8C8D' />}
        route='/'
      />

      <Card
        title='Tire pressure'
        category='Transport'
        icon={<TirePressureIcon size={44} color='#7F8C8D' />}
        route='/'
      />
    </View>
  );
}
