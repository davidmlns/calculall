import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { CookingIcon, CookingTimeIcon, TimerSettingsIcon, VolumeIcon } from './Icons';
import { useTranslation } from 'react-i18next';

export default function Kitchen() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Cooking'
        title={t('kitchenCardTitle.Cooking')}
        category={t('categoryName.Kitchen')}
        icon={<CookingIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/Cooking'
      />

      <FilterableCard
        id='Cooking time'
        title={t('kitchenCardTitle.CookingTime')}
        category={t('categoryName.Kitchen')}
        icon={<CookingTimeIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/CookingTime'
      />

      <FilterableCard
        id='Timer setting'
        title={t('kitchenCardTitle.TimerSettings')}
        category={t('categoryName.Kitchen')}
        icon={<TimerSettingsIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/TimerSettings'
      />

      <FilterableCard
        id='Volume'
        title={t('kitchenCardTitle.Volume')}
        category={t('categoryName.Kitchen')}
        icon={<VolumeIcon size={52} color='#F39C12' />}
        route='/(pages)/(kitchen)/Volume'
      />
    </View>
  );
}
