import { View } from 'react-native';
import Card from './Card';
import { LatitudeIcon, PopulationDensityIcon } from './Icons';

export default function Geography() {
  return (
    <View className='mt-6 flex-row flex-wrap justify-around'>
      <Card
        title='Lat. & coor. '
        category='Geography'
        icon={<LatitudeIcon size={44} color='#D35400' />}
        route='/'
      />

      <Card
        title='Demographic'
        category='Geography'
        icon={<PopulationDensityIcon size={44} color='#D35400' />}
        route='/'
      />
    </View>
  );
}
