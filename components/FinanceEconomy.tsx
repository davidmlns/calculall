import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { icons } from './Icons';
import { useTranslation } from 'react-i18next';

export default function FinanceEconomy() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-4 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Budgeting'
        title={t('financesCardTitle.Budgeting')}
        icon={icons.BudgetingIcon}
        iconSize={56}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Budgeting'
      />

      <FilterableCard
        id='Discounts'
        title={t('financesCardTitle.Discounts')}
        icon={icons.DiscountsIcon}
        iconSize={56}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Discounts'
      />

      <FilterableCard
        id='Inflation'
        title={t('financesCardTitle.Inflation')}
        icon={icons.InflationIcon}
        iconSize={56}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Inflation'
      />

      <FilterableCard
        id='Interests'
        title={t('financesCardTitle.Interests')}
        icon={icons.InterestIcon}
        iconSize={56}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Interests'
      />

      <FilterableCard
        id='Loan'
        title={t('financesCardTitle.Loan')}
        icon={icons.LoanIcon}
        iconSize={56}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Loan'
      />

      <FilterableCard
        id='Percentage'
        title={t('financesCardTitle.Percentage')}
        icon={icons.PercentageIcon}
        iconSize={56}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Percentage'
      />

      <FilterableCard
        id='Taxes'
        title={t('financesCardTitle.Taxes')}
        icon={icons.TaxesIcon}
        iconSize={56}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Taxes'
      />

      <FilterableCard
        id='Tips'
        title={t('financesCardTitle.Tips')}
        icon={icons.TipIcon}
        iconSize={56}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Tips'
      />
    </View>
  );
}
