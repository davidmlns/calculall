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
        title='Age  '
        category='Others'
        icon={<AgeIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Age'
      />

      <FilterableCard
        title='Currency'
        category='Others'
        icon={<CurrencyIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Currency'
      />

      <FilterableCard
        title='Dates '
        category='Others'
        icon={<DateIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Date'
      />

      <FilterableCard
        title='Density '
        category='Others'
        icon={<DensityIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Density'
      />

      <FilterableCard
        title='Password'
        category='Others'
        icon={<PasswordIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Password'
      />

      <FilterableCard
        title='QR generator'
        category='Others'
        icon={<QrCodeIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/QrCode'
      />

      <FilterableCard
        title='UUID'
        category='Others'
        icon={<UUIDIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/UUID'
      />

      <FilterableCard
        title='Weight '
        category='Others'
        icon={<WeightIcon size={52} color='#1ABC9C' />}
        route='/(pages)/(others)/Weight'
      />
    </View>
  );
}
