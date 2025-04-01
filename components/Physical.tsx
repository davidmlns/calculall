import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { icons } from './Icons';
import { useTranslation } from 'react-i18next';

export default function Physical() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Energy'
        title={t('physicalCardTitle.Energy')}
        category={t('categoryName.physical')}
        icon={icons.EnergyIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Energy'
      />

      <FilterableCard
        id='Gravity'
        title={t('physicalCardTitle.Gravity')}
        category={t('categoryName.physical')}
        icon={icons.ForceGravityIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Gravity'
      />

      <FilterableCard
        id='Humidity'
        title={t('physicalCardTitle.Humidity')}
        category={t('categoryName.physical')}
        icon={icons.HumidityIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Humidity'
      />

      <FilterableCard
        id='Illuminance'
        title={t('physicalCardTitle.Illuminance')}
        category={t('categoryName.physical')}
        icon={icons.IlluminanceIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Illuminance'
      />

      <FilterableCard
        id='Magnetism'
        title={t('physicalCardTitle.Magnetism')}
        category={t('categoryName.physical')}
        icon={icons.MagnetismIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Magnetism'
      />

      <FilterableCard
        id='Ohm'
        title={t('physicalCardTitle.Ohm')}
        category={t('categoryName.physical')}
        icon={icons.OhmIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Ohm'
      />

      <FilterableCard
        id='Pressure'
        title={t('physicalCardTitle.Pressure')}
        category={t('categoryName.physical')}
        icon={icons.PressureIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Pressure'
      />

      <FilterableCard
        id='Radiation'
        title={t('physicalCardTitle.Radiation')}
        category={t('categoryName.physical')}
        icon={icons.RadiationIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Radiation'
      />

      <FilterableCard
        id='SolarEnergy'
        title={t('physicalCardTitle.Solar Energy')}
        category={t('categoryName.physical')}
        icon={icons.SunIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/SolarEnergy'
      />

      <FilterableCard
        id='Sound'
        title={t('physicalCardTitle.Sound')}
        category={t('categoryName.physical')}
        icon={icons.SoundIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Sound'
      />

      <FilterableCard
        id='Temperature'
        title={t('physicalCardTitle.Temperature')}
        category={t('categoryName.physical')}
        icon={icons.TemperatureIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Temperature'
      />

      <FilterableCard
        id='Velocity'
        title={t('physicalCardTitle.Velocity')}
        category={t('categoryName.physical')}
        icon={icons.VelocityIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Velocity'
      />

      <FilterableCard
        id='Wavelength'
        title={t('physicalCardTitle.Wavelength')}
        category={t('categoryName.physical')}
        icon={icons.WavelengthIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/Wavelength'
      />

      <FilterableCard
        id='WindSpeed'
        title={t('physicalCardTitle.WindSpeed')}
        category={t('categoryName.physical')}
        icon={icons.WindSpeedIcon}
        iconSize={52}
        iconColor='#2E86C1'
        route='/(pages)/WindSpeed'
      />
    </View>
  );
}
