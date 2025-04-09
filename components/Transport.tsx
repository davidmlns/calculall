import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { icons } from './Icons';
import { useTranslation } from 'react-i18next';

export default function Transport() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-4 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Autonomy'
        title={t('transportCardTitle.Autonomy')}
        icon={icons.AutonomyIcon}
        iconSize={56}
        iconColor='#7F8C8D'
        route='/(pages)/(transport)/Autonomy'
      />

      <FilterableCard
        id='CO2'
        title={t('transportCardTitle.CO2')}
        icon={icons.CO2Icon}
        iconSize={56}
        iconColor='#7F8C8D'
        route='/(pages)/(transport)/CO2'
      />
      <FilterableCard
        id='Fuel'
        title={t('transportCardTitle.Fuel')}
        icon={icons.FuelIcon}
        iconSize={56}
        iconColor='#7F8C8D'
        route='/(pages)/(transport)/Fuel'
      />

      <FilterableCard
        id='Mileage'
        title={t('transportCardTitle.Mileage')}
        icon={icons.MileageIcon}
        iconSize={56}
        iconColor='#7F8C8D'
        route='/(pages)/(transport)/Mileage'
      />
    </View>
  );
}
