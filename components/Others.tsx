import { View } from 'react-native';
import Card from './Card';
import {
  AgeIcon,
  CurrencyIcon,
  DateIcon,
  DensityIcon,
  PasswordIcon,
  QrCodeIcon,
  TimeIcon,
  UUIDIcon,
  WeightIcon,
} from './Icons';

export default function Others() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <Card
        title='Age  '
        category='Others'
        icon={<AgeIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Age'
      />

      <Card
        title='Currency'
        category='Others'
        icon={<CurrencyIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Currency'
      />

      <Card
        title='Dates '
        category='Others'
        icon={<DateIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Date'
      />

      <Card
        title='Density '
        category='Others'
        icon={<DensityIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Density'
      />

      <Card
        title='Password'
        category='Others'
        icon={<PasswordIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Password'
      />

      <Card
        title='QR generator'
        category='Others'
        icon={<QrCodeIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/QrCode'
      />

      <Card
        title='UUID'
        category='Others'
        icon={<UUIDIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/UUID'
      />

      <Card
        title='Weight '
        category='Others'
        icon={<WeightIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Weight'
      />
    </View>
  );
}
