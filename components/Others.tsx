import { View } from 'react-native';
import Card from './Card';
import {
  AgeIcon,
  DateIcon,
  DensityIcon,
  LatitudeIcon,
  PasswordIcon,
  PopulationDensityIcon,
  QrCodeIcon,
  TimeIcon,
  UUIDIcon,
  WeightIcon,
} from './Icons';

export default function Others() {
  return (
    <View className='mt-6 flex-row flex-wrap justify-around'>
      <Card
        title='Age  '
        category='Others'
        icon={<AgeIcon size={44} color='#1ABC9C' />}
        route='/'
      />

      <Card
        title='Dates '
        category='Others'
        icon={<DateIcon size={44} color='#1ABC9C' />}
        route='/'
      />

      <Card
        title='Density '
        category='Others'
        icon={<DensityIcon size={44} color='#1ABC9C' />}
        route='/'
      />

      <Card
        title='Password'
        category='Others'
        icon={<PasswordIcon size={44} color='#1ABC9C' />}
        route='/'
      />

      <Card
        title='QR generator'
        category='Others'
        icon={<QrCodeIcon size={44} color='#1ABC9C' />}
        route='/'
      />

      <Card
        title='Time  '
        category='Others'
        icon={<TimeIcon size={44} color='#1ABC9C' />}
        route='/'
      />

      <Card
        title='UUID'
        category='Others'
        icon={<UUIDIcon size={44} color='#1ABC9C' />}
        route='/'
      />

      <Card
        title='Weight '
        category='Others'
        icon={<WeightIcon size={44} color='#1ABC9C' />}
        route='/'
      />
    </View>
  );
}
