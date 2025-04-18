import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { icons } from './Icons';
import { useTranslation } from 'react-i18next';

export default function Geography() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-4 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Latitude'
        title={t('geographyCardTitle.LatitudeLongitude')}
        icon={icons.LatitudeIcon}
        iconSize={56}
        iconColor='#D35400'
        route='/(pages)/(geo)/Latitude'
      />

      <FilterableCard
        id='Demographic'
        title={t('geographyCardTitle.Demography')}
        icon={icons.PopulationDensityIcon}
        iconSize={56}
        iconColor='#D35400'
        route='/(pages)/(geo)/Demographic'
      />
    </View>
  );
}
