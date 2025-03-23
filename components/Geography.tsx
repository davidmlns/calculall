import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { LatitudeIcon, PopulationDensityIcon } from './Icons';

export default function Geography() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Latitude'
        title='Lat. & coor. '
        category='Geography'
        icon={<LatitudeIcon size={52} color='#D35400' />}
        route='/(pages)/(geo)/Latitude'
      />

      <FilterableCard
        id='Demographic'
        title='Demographic'
        category='Geography'
        icon={<PopulationDensityIcon size={52} color='#D35400' />}
        route='/(pages)/(geo)/Demographic'
      />
    </View>
  );
}
