import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import {
  BudgetingIcon,
  DiscountsIcon,
  InflationIcon,
  InterestIcon,
  LoanIcon,
  PercentageIcon,
  TaxesIcon,
  TipIcon,
} from './Icons';
import { useTranslation } from 'react-i18next';

export default function FinanceEconomy() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Budgeting'
        title={t('financesCardTitle.Budgeting')}
        category={t('categoryName.Finances')}
        icon={<BudgetingIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Budgeting'
      />

      <FilterableCard
        id='Discounts'
        title={t('financesCardTitle.Discounts')}
        category={t('categoryName.Finances')}
        icon={<DiscountsIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Discounts'
      />

      <FilterableCard
        id='Inflation'
        title={t('financesCardTitle.Inflation')}
        category={t('categoryName.Finances')}
        icon={<InflationIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Inflation'
      />

      <FilterableCard
        id='Interests'
        title={t('financesCardTitle.Interests')}
        category={t('categoryName.Finances')}
        icon={<InterestIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Interests'
      />

      <FilterableCard
        id='Loan'
        title={t('financesCardTitle.Loan')}
        category={t('categoryName.Finances')}
        icon={<LoanIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Loan'
      />

      <FilterableCard
        id='Percentage'
        title={t('financesCardTitle.Percentage')}
        category={t('categoryName.Finances')}
        icon={<PercentageIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Percentage'
      />

      <FilterableCard
        id='Taxes'
        title={t('financesCardTitle.Taxes')}
        category={t('categoryName.Finances')}
        icon={<TaxesIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Taxes'
      />

      <FilterableCard
        id='Tips'
        title={t('financesCardTitle.Tips')}
        category={t('categoryName.Finances')}
        icon={<TipIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Tips'
      />
    </View>
  );
}
