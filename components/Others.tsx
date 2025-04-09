import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { useTranslation } from 'react-i18next';
import { icons } from './Icons';

export default function Others() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-4 mb-8 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Age'
        title={t('othersCardTitle.Age')}
        icon={icons.AgeIcon}
        iconSize={56}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Age'
      />

      <FilterableCard
        id='Currency'
        title={t('othersCardTitle.Currency')}
        icon={icons.CurrencyIcon}
        iconSize={56}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Currency'
      />

      <FilterableCard
        id='Date'
        title={t('othersCardTitle.Dates')}
        icon={icons.DateIcon}
        iconSize={56}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Date'
      />

      <FilterableCard
        id='Density'
        title={t('othersCardTitle.Density')}
        icon={icons.DensityIcon}
        iconSize={56}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Density'
      />

      <FilterableCard
        id='Password'
        title={t('othersCardTitle.Password')}
        icon={icons.PasswordIcon}
        iconSize={56}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Password'
      />

      <FilterableCard
        id='QR generator'
        title={t('othersCardTitle.QRGenerator')}
        icon={icons.QrCodeIcon}
        iconSize={56}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/QrCode'
      />

      <FilterableCard
        id='UUID'
        title={t('othersCardTitle.UUID')}
        icon={icons.UUIDIcon}
        iconSize={56}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/UUID'
      />

      <FilterableCard
        id='Weight'
        title={t('othersCardTitle.Weight')}
        icon={icons.WeightIcon}
        iconSize={56}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Weight'
      />
    </View>
  );
}
