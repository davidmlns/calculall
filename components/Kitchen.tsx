import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { CookingIcon, CookingTimeIcon, TimerSettingsIcon, VolumeIcon } from './Icons';

export default function Kitchen() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Cooking'
        title='Cooking'
        category='Kitchen'
        icon={<CookingIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/Cooking'
      />

      <FilterableCard
        id='Cooking time'
        title='Cooking time'
        category='Kitchen'
        icon={<CookingTimeIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/CookingTime'
      />

      <FilterableCard
        id='Timer setting'
        title='Timer setting '
        category='Kitchen'
        icon={<TimerSettingsIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/TimerSettings'
      />

      <FilterableCard
        id='Volume'
        title='Volume '
        category='Kitchen'
        icon={<VolumeIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/Volume'
      />
    </View>
  );
}
