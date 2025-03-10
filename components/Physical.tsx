import { View } from 'react-native';
import Card from './Card';
import {
  EnergyIcon,
  ForceGravityIcon,
  HumidityIcon,
  IlluminanceIcon,
  MagnetismIcon,
  OhmIcon,
  PressureIcon,
  RadiationIcon,
  SoundIcon,
  SunIcon,
  TemperatureIcon,
  VelocityIcon,
  WavelengthIcon,
  WindSpeedIcon,
} from './Icons';

export default function Physical() {
  return (
    <View className='mt-6 flex-row flex-wrap justify-around'>
      <Card
        title='Energy'
        category='Physical'
        icon={<EnergyIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Gravity'
        category='Physical'
        icon={<ForceGravityIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Humidity'
        category='Physical'
        icon={<HumidityIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Illuminance'
        category='Physical'
        icon={<IlluminanceIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Magnetism'
        category='Physical'
        icon={<MagnetismIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title="Ohm's Law"
        category='Physical'
        icon={<OhmIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Pressure'
        category='Physical'
        icon={<PressureIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Radiation'
        category='Physical'
        icon={<RadiationIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Solar energy'
        category='Physical'
        icon={<SunIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Sound'
        category='Physical'
        icon={<SoundIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Temperature'
        category='Physical'
        icon={<TemperatureIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Velocity'
        category='Physical'
        icon={<VelocityIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Wavelength'
        category='Physical'
        icon={<WavelengthIcon size={44} color='#2E86C1' />}
        route='/'
      />

      <Card
        title='Wind speed'
        category='Physical'
        icon={<WindSpeedIcon size={44} color='#2E86C1' />}
        route='/'
      />
    </View>
  );
}
