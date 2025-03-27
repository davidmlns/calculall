import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import {
  BatteryIcon,
  DataTransferIcon,
  DigitalDataIcon,
  ElectricalResistanceIcon,
  ElectricConsumptionIcon,
  ElectricCurrentIcon,
} from './Icons';
import { useTranslation } from 'react-i18next';

export default function Technology() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Battery'
        title={t('technologyCardTitle.Battery')}
        category={t('categoryName.Technology')}
        icon={<BatteryIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/Battery'
      />

      <FilterableCard
        id='Data transfer'
        title={t('technologyCardTitle.DataTransfer')}
        category={t('categoryName.Technology')}
        icon={<DataTransferIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/DataTransfer'
      />

      <FilterableCard
        id='Digital data'
        title={t('technologyCardTitle.DigitalData')}
        category={t('categoryName.Technology')}
        icon={<DigitalDataIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/DigitalData'
      />

      <FilterableCard
        id='Electric current'
        title={t('technologyCardTitle.ElectricCurrent')}
        category={t('categoryName.Technology')}
        icon={<ElectricCurrentIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricCurrent'
      />

      <FilterableCard
        id='Electric usage'
        title={t('technologyCardTitle.ElectricConsumption')}
        category={t('categoryName.Technology')}
        icon={<ElectricConsumptionIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricConsumption'
      />

      <FilterableCard
        id='Electric resistance'
        title={t('technologyCardTitle.ElectricResistance')}
        category={t('categoryName.Technology')}
        icon={<ElectricalResistanceIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricalResistance'
      />
    </View>
  );
}
