import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { icons } from './Icons';
import { useTranslation } from 'react-i18next';

export default function Health() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='BMI'
        title={t('healthCardTitle.BMI')}
        category={t('categoryName.Health')}
        icon={icons.BMIIcon}
        iconSize={52}
        iconColor='#E74C3C'
        route='/(pages)/(health)/BMI'
      />

      <FilterableCard
        id='Calories'
        title={t('healthCardTitle.Calories')}
        category={t('categoryName.Health')}
        icon={icons.CaloriesIcon}
        iconSize={52}
        iconColor='#E74C3C'
        route='/(pages)/(health)/Calories'
      />

      <FilterableCard
        id='Hydration'
        title={t('healthCardTitle.Hydration')}
        category={t('categoryName.Health')}
        icon={icons.HydrationIcon}
        iconSize={52}
        iconColor='#E74C3C'
        route='/(pages)/(health)/Hydration'
      />

      <FilterableCard
        id='Medication'
        title={t('healthCardTitle.Medication')}
        category={t('categoryName.Health')}
        icon={icons.MedicationIcon}
        iconSize={52}
        iconColor='#E74C3C'
        route='/(pages)/(health)/Medication'
      />
    </View>
  );
}
