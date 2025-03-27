import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { AutonomyIcon, CO2Icon, FuelIcon, MileageIcon } from './Icons';
import { useTranslation } from 'react-i18next';

export default function Transport() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Autonomy'
        title={t('transportCardTitle.Autonomy')}
        category={t('categoryName.Transport')}
        icon={<AutonomyIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Autonomy'
      />

      <FilterableCard
        id='CO2'
        title={t('transportCardTitle.CO2')}
        category={t('categoryName.Transport')}
        icon={<CO2Icon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/CO2'
      />
      <FilterableCard
        id='Fuel'
        title={t('transportCardTitle.Fuel')}
        category={t('categoryName.Transport')}
        icon={<FuelIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Fuel'
      />

      <FilterableCard
        id='Mileage'
        title={t('transportCardTitle.Mileage')}
        category={t('categoryName.Transport')}
        icon={<MileageIcon size={52} color='#7F8C8D' />}
        route='/(pages)/(transport)/Mileage'
      />
    </View>
  );
}
