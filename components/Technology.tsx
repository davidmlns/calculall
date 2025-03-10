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
    <View className='mt-6 flex-row flex-wrap justify-around'>
      <Card
        title='Battery'
        category='Electronics'
        icon={<BatteryIcon size={44} color='#3498DB' />}
        route='/'
      />

      <Card
        title='Data transfer '
        category='Technology'
        icon={<DataTransferIcon size={44} color='#3498DB' />}
        route='/'
      />

      <Card
        title='Digital data '
        category='Technology'
        icon={<DigitalDataIcon size={44} color='#3498DB' />}
        route='/'
      />

      <Card
        title='Elec. current '
        category='Electronics'
        icon={<ElectricCurrentIcon size={44} color='#3498DB' />}
        route='/'
      />

      <Card
        title='Elec. usage '
        category='Electronics'
        icon={<ElectricConsumptionIcon size={44} color='#3498DB' />}
        route='/'
      />

      <Card
        title='Electric Res. '
        category='Electronics'
        icon={<ElectricalResistanceIcon size={44} color='#3498DB' />}
        route='/'
      />
    </View>
  );
}
