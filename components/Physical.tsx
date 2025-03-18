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
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <Card
        title='Energy'
        category='Physical'
        icon={<EnergyIcon size={44} color='#2E86C1' />}
        route='/(pages)/Energy'
      />

      <Card
        title='Gravity'
        category='Physical'
        icon={<ForceGravityIcon size={44} color='#2E86C1' />}
        route='/(pages)/Gravity'
      />

      <Card
        title='Humidity'
        category='Physical'
        icon={<HumidityIcon size={44} color='#2E86C1' />}
        route='/(pages)/Humidity'
      />

      <Card
        title='Illuminance'
        category='Physical'
        icon={<IlluminanceIcon size={44} color='#2E86C1' />}
        route='/(pages)/Illuminance'
      />

      <Card
        title='Magnetism'
        category='Physical'
        icon={<MagnetismIcon size={44} color='#2E86C1' />}
        route='/(pages)/Magnetism'
      />

      <Card
        title="Ohm's Law"
        category='Physical'
        icon={<OhmIcon size={44} color='#2E86C1' />}
        route='/(pages)/Ohm'
      />

      <Card
        title='Pressure'
        category='Physical'
        icon={<PressureIcon size={44} color='#2E86C1' />}
        route='/(pages)/Pressure'
      />

      <Card
        title='Radiation'
        category='Physical'
        icon={<RadiationIcon size={44} color='#2E86C1' />}
        route='/(pages)/Radiation'
      />

      <Card
        title='Solar energy'
        category='Physical'
        icon={<SunIcon size={44} color='#2E86C1' />}
        route='/(pages)/SolarEnergy'
      />

      <Card
        title='Sound'
        category='Physical'
        icon={<SoundIcon size={44} color='#2E86C1' />}
        route='/(pages)/Sound'
      />

      <Card
        title='Temperature'
        category='Physical'
        icon={<TemperatureIcon size={44} color='#2E86C1' />}
        route='/(pages)/Temperature'
      />

      <Card
        title='Velocity'
        category='Physical'
        icon={<VelocityIcon size={44} color='#2E86C1' />}
        route='/(pages)/Velocity'
      />

      <Card
        title='Wavelength'
        category='Physical'
        icon={<WavelengthIcon size={44} color='#2E86C1' />}
        route='/(pages)/Wavelength'
      />

      <Card
        title='Wind speed'
        category='Physical'
        icon={<WindSpeedIcon size={44} color='#2E86C1' />}
        route='/(pages)/WindSpeed'
      />
    </View>
  );
}
