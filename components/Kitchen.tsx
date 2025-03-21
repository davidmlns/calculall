import { View } from 'react-native';
import Card from './Card';
import { CookingIcon, CookingTimeIcon, TimerSettingsIcon, VolumeIcon } from './Icons';

export default function Kitchen() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <Card
        title='Cooking'
        category='Kitchen'
        icon={<CookingIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/Cooking'
      />

      <Card
        title='Cooking time'
        category='Kitchen'
        icon={<CookingTimeIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/CookingTime'
      />

      <Card
        title='Timer setting '
        category='Kitchen'
        icon={<TimerSettingsIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/TimerSettings'
      />

      <Card
        title='Volume '
        category='Kitchen'
        icon={<VolumeIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/Volume'
      />
    </View>
  );
}
