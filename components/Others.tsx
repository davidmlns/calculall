import { View } from 'react-native';
import FilterableCard from './FilterableCard';

import {
  AgeIcon,
  CurrencyIcon,
  DateIcon,
  DensityIcon,
  PasswordIcon,
  QrCodeIcon,
  UUIDIcon,
  WeightIcon,
} from './Icons';

export default function Others() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Age'
        title='Age  '
        category='Others'
        icon={<AgeIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Age'
      />

      <FilterableCard
        id='Currency'
        title='Currency'
        category='Others'
        icon={<CurrencyIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Currency'
      />

      <FilterableCard
        id='Date'
        title='Dates '
        category='Others'
        icon={<DateIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Date'
      />

      <FilterableCard
        id='Density'
        title='Density '
        category='Others'
        icon={<DensityIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Density'
      />

      <FilterableCard
        id='Password'
        title='Password'
        category='Others'
        icon={<PasswordIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Password'
      />

      <FilterableCard
        id='QR generator'
        title='QR generator'
        category='Others'
        icon={<QrCodeIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/QrCode'
      />

      <FilterableCard
        id='UUID'
        title='UUID'
        category='Others'
        icon={<UUIDIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/UUID'
      />

      <FilterableCard
        id='Weight'
        title='Weight '
        category='Others'
        icon={<WeightIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Weight'
      />
    </View>
  );
}
