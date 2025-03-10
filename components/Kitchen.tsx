import { View } from 'react-native';
import Card from './Card';
import { CookingIcon, CookingTimeIcon, TimerSettingsIcon, VolumeIcon } from './Icons';

export default function Kitchen() {
  return (
    <View className='mt-6 flex-row flex-wrap justify-around'>
      <Card
        title='Cooking'
        category='Kitchen'
        icon={<CookingIcon size={44} color='#F39C12' />}
        route='/'
      />

      <Card
        title='Cooking time'
        category='Kitchen'
        icon={<CookingTimeIcon size={44} color='#F39C12' />}
        route='/'
      />

      <Card
        title='Timer setting '
        category='Kitchen'
        icon={<TimerSettingsIcon size={44} color='#F39C12' />}
        route='/'
      />

      <Card
        title='Volume '
        category='Kitchen'
        icon={<VolumeIcon size={44} color='#F39C12' />}
        route='/'
      />
    </View>
  );
}
