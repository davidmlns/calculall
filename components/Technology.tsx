import { View } from 'react-native';
import Card from './Card';
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
      <Card
        title='Battery'
        category='Electronics'
        icon={<BatteryIcon size={44} color='#3498DB' />}
        route='/(pages)/(tech)/Battery'
      />

      <Card
        title='Data transfer '
        category='Technology'
        icon={<DataTransferIcon size={44} color='#3498DB' />}
        route='/(pages)/(tech)/DataTransfer'
      />

      <Card
        title='Digital data '
        category='Technology'
        icon={<DigitalDataIcon size={44} color='#3498DB' />}
        route='/(pages)/(tech)/DigitalData'
      />

      <Card
        title='Elec. current '
        category='Electronics'
        icon={<ElectricCurrentIcon size={44} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricCurrent'
      />

      <Card
        title='Elec. usage '
        category='Electronics'
        icon={<ElectricConsumptionIcon size={44} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricConsumption'
      />

      <Card
        title='Electric Res. '
        category='Electronics'
        icon={<ElectricalResistanceIcon size={44} color='#3498DB' />}
        route='/(pages)/(tech)/ElectricalResistance'
      />
    </View>
  );
}
