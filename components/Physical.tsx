import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { icons } from './Icons';
import { useTranslation } from 'react-i18next';

export default function Physical() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-4 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Energy'
        title={t('physicalCardTitle.Energy')}
        icon={icons.EnergyIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Energy'
      />

      <FilterableCard
        id='Gravity'
        title={t('physicalCardTitle.Gravity')}
        icon={icons.ForceGravityIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Gravity'
      />

      <FilterableCard
        id='Humidity'
        title={t('physicalCardTitle.Humidity')}
        icon={icons.HumidityIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Humidity'
      />

      <FilterableCard
        id='Illuminance'
        title={t('physicalCardTitle.Illuminance')}
        icon={icons.IlluminanceIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Illuminance'
      />

      <FilterableCard
        id='Magnetism'
        title={t('physicalCardTitle.Magnetism')}
        icon={icons.MagnetismIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Magnetism'
      />

      <FilterableCard
        id='Ohm'
        title={t('physicalCardTitle.Ohm')}
        icon={icons.OhmIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Ohm'
      />

      <FilterableCard
        id='Pressure'
        title={t('physicalCardTitle.Pressure')}
        icon={icons.PressureIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Pressure'
      />

      <FilterableCard
        id='Radiation'
        title={t('physicalCardTitle.Radiation')}
        icon={icons.RadiationIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Radiation'
      />

      <FilterableCard
        id='SolarEnergy'
        title={t('physicalCardTitle.Solar Energy')}
        icon={icons.SunIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/SolarEnergy'
      />

      <FilterableCard
        id='Sound'
        title={t('physicalCardTitle.Sound')}
        icon={icons.SoundIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Sound'
      />

      <FilterableCard
        id='Temperature'
        title={t('physicalCardTitle.Temperature')}
        icon={icons.TemperatureIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Temperature'
      />

      <FilterableCard
        id='Velocity'
        title={t('physicalCardTitle.Velocity')}
        icon={icons.VelocityIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Velocity'
      />

      <FilterableCard
        id='Wavelength'
        title={t('physicalCardTitle.Wavelength')}
        icon={icons.WavelengthIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/Wavelength'
      />

      <FilterableCard
        id='WindSpeed'
        title={t('physicalCardTitle.WindSpeed')}
        icon={icons.WindSpeedIcon}
        iconSize={56}
        iconColor='#2E86C1'
        route='/(pages)/WindSpeed'
      />
    </View>
  );
}
