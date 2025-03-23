import { View } from 'react-native';
import FilterableCard from './FilterableCard';
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
      <FilterableCard
        title='Energy'
        category='Physical'
        icon={<EnergyIcon size={52} color='#2E86C1' />}
        route='/(pages)/Energy'
      />

      <FilterableCard
        id='Gravity'
        title='Gravity'
        category='Physical'
        icon={<ForceGravityIcon size={52} color='#2E86C1' />}
        route='/(pages)/Gravity'
      />

      <FilterableCard
        id='Humidity'
        title='Humidity'
        category='Physical'
        icon={<HumidityIcon size={52} color='#2E86C1' />}
        route='/(pages)/Humidity'
      />

      <FilterableCard
        id='Illuminance'
        title='Illuminance'
        category='Physical'
        icon={<IlluminanceIcon size={52} color='#2E86C1' />}
        route='/(pages)/Illuminance'
      />

      <FilterableCard
        id='Magnetism'
        title='Magnetism'
        category='Physical'
        icon={<MagnetismIcon size={52} color='#2E86C1' />}
        route='/(pages)/Magnetism'
      />

      <FilterableCard
        id='Ohm'
        title="Ohm's Law"
        category='Physical'
        icon={<OhmIcon size={52} color='#2E86C1' />}
        route='/(pages)/Ohm'
      />

      <FilterableCard
        id='Pressure'
        title='Pressure'
        category='Physical'
        icon={<PressureIcon size={52} color='#2E86C1' />}
        route='/(pages)/Pressure'
      />

      <FilterableCard
        id='Radiation'
        title='Radiation'
        category='Physical'
        icon={<RadiationIcon size={52} color='#2E86C1' />}
        route='/(pages)/Radiation'
      />

      <FilterableCard
        id='SolarEnergy'
        title='Solar energy'
        category='Physical'
        icon={<SunIcon size={52} color='#2E86C1' />}
        route='/(pages)/SolarEnergy'
      />

      <FilterableCard
        id='Sound'
        title='Sound'
        category='Physical'
        icon={<SoundIcon size={52} color='#2E86C1' />}
        route='/(pages)/Sound'
      />

      <FilterableCard
        id='Temperature'
        title='Temperature'
        category='Physical'
        icon={<TemperatureIcon size={52} color='#2E86C1' />}
        route='/(pages)/Temperature'
      />

      <FilterableCard
        id='Velocity'
        title='Velocity'
        category='Physical'
        icon={<VelocityIcon size={52} color='#2E86C1' />}
        route='/(pages)/Velocity'
      />

      <FilterableCard
        id='Wavelength'
        title='Wavelength'
        category='Physical'
        icon={<WavelengthIcon size={52} color='#2E86C1' />}
        route='/(pages)/Wavelength'
      />

      <FilterableCard
        id='WindSpeed'
        title='Wind speed'
        category='Physical'
        icon={<WindSpeedIcon size={52} color='#2E86C1' />}
        route='/(pages)/WindSpeed'
      />
    </View>
  );
}
