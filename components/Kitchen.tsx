import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { icons } from './Icons';
import { useTranslation } from 'react-i18next';

export default function Kitchen() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-4 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Cooking'
        title={t('kitchenCardTitle.Cooking')}
        icon={icons.CookingIcon}
        iconSize={56}
        iconColor='#F39C12'
        route='/(pages)/(kitchen)/Cooking'
      />

      <FilterableCard
        id='Cooking time'
        title={t('kitchenCardTitle.CookingTime')}
        icon={icons.CookingTimeIcon}
        iconSize={56}
        iconColor='#F39C12'
        route='/(pages)/(kitchen)/CookingTime'
      />

      <FilterableCard
        id='Timer setting'
        title={t('kitchenCardTitle.TimerSettings')}
        icon={icons.TimerSettingsIcon}
        iconSize={56}
        iconColor='#F39C12'
        route='/(pages)/(kitchen)/TimerSettings'
      />

      <FilterableCard
        id='Volume'
        title={t('kitchenCardTitle.Volume')}
        icon={icons.VolumeIcon}
        iconSize={56}
        iconColor='#F39C12'
        route='/(pages)/(kitchen)/Volume'
      />
    </View>
  );
}
