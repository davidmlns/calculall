import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { useTranslation } from 'react-i18next';
import { icons } from './Icons';

export default function Others() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Age'
        title={t('othersCardTitle.Age')}
        category={t('categoryName.Others')}
        icon={icons.AgeIcon}
        iconSize={52}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Age'
      />

      <FilterableCard
        id='Currency'
        title={t('othersCardTitle.Currency')}
        category={t('categoryName.Others')}
        icon={icons.CurrencyIcon}
        iconSize={52}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Currency'
      />

      <FilterableCard
        id='Date'
        title={t('othersCardTitle.Dates')}
        category={t('categoryName.Others')}
        icon={icons.DateIcon}
        iconSize={52}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Date'
      />

      <FilterableCard
        id='Density'
        title={t('othersCardTitle.Density')}
        category={t('categoryName.Others')}
        icon={icons.DensityIcon}
        iconSize={52}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Density'
      />

      <FilterableCard
        id='Password'
        title={t('othersCardTitle.Password')}
        category={t('categoryName.Others')}
        icon={icons.PasswordIcon}
        iconSize={52}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Password'
      />

      <FilterableCard
        id='QR generator'
        title={t('othersCardTitle.QRGenerator')}
        category={t('categoryName.Others')}
        icon={icons.QrCodeIcon}
        iconSize={52}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/QrCode'
      />

      <FilterableCard
        id='UUID'
        title={t('othersCardTitle.UUID')}
        category={t('categoryName.Others')}
        icon={icons.UUIDIcon}
        iconSize={52}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/UUID'
      />

      <FilterableCard
        id='Weight'
        title={t('othersCardTitle.Weight')}
        category={t('categoryName.Others')}
        icon={icons.WeightIcon}
        iconSize={52}
        iconColor='#1ABC9C'
        route='/(pages)/(others)/Weight'
      />
    </View>
  );
}
