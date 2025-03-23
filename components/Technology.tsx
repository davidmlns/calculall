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

export default function Technology() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Battery'
        title='Battery'
        category='Electronics'
        icon={<BatteryIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/Battery'
      />

      <FilterableCard
        id='Data transfer'
        title='Data transfer '
        category='Technology'
        icon={<DataTransferIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/DataTransfer'
      />

      <FilterableCard
        id='Digital data'
        title='Digital data '
        category='Technology'
        icon={<DigitalDataIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/DigitalData'
      />

      <FilterableCard
        id='Electric current'
        title='Elec. current '
        category='Electronics'
        icon={<ElectricCurrentIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricCurrent'
      />

      <FilterableCard
        id='Electric usage'
        title='Elec. usage '
        category='Electronics'
        icon={<ElectricConsumptionIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricConsumption'
      />

      <FilterableCard
        id='Electric resistance'
        title='Electric Res. '
        category='Electronics'
        icon={<ElectricalResistanceIcon size={52} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricalResistance'
      />
    </View>
  );
}
