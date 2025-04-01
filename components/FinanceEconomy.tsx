import { View } from 'react-native';
import FilterableCard from './FilterableCard';
import { icons } from './Icons';
import { useTranslation } from 'react-i18next';

export default function FinanceEconomy() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Budgeting'
        title={t('financesCardTitle.Budgeting')}
        category={t('categoryName.Finances')}
        icon={icons.BudgetingIcon}
        iconSize={52}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Budgeting'
      />

      <FilterableCard
        id='Discounts'
        title={t('financesCardTitle.Discounts')}
        category={t('categoryName.Finances')}
        icon={icons.DiscountsIcon}
        iconSize={52}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Discounts'
      />

      <FilterableCard
        id='Inflation'
        title={t('financesCardTitle.Inflation')}
        category={t('categoryName.Finances')}
        icon={icons.InflationIcon}
        iconSize={52}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Inflation'
      />

      <FilterableCard
        id='Interests'
        title={t('financesCardTitle.Interests')}
        category={t('categoryName.Finances')}
        icon={icons.InterestIcon}
        iconSize={52}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Interests'
      />

      <FilterableCard
        id='Loan'
        title={t('financesCardTitle.Loan')}
        category={t('categoryName.Finances')}
        icon={icons.LoanIcon}
        iconSize={52}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Loan'
      />

      <FilterableCard
        id='Percentage'
        title={t('financesCardTitle.Percentage')}
        category={t('categoryName.Finances')}
        icon={icons.PercentageIcon}
        iconSize={52}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Percentage'
      />

      <FilterableCard
        id='Taxes'
        title={t('financesCardTitle.Taxes')}
        category={t('categoryName.Finances')}
        icon={icons.TaxesIcon}
        iconSize={52}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Taxes'
      />

      <FilterableCard
        id='Tips'
        title={t('financesCardTitle.Tips')}
        category={t('categoryName.Finances')}
        icon={icons.TipIcon}
        iconSize={52}
        iconColor='#27AE60'
        route='/(pages)/(finances)/Tips'
      />
    </View>
  );
}
