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

export default function FinanceEconomy() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        title='Budgeting'
        category='Finances'
        icon={<BudgetingIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Budgeting'
      />

      <FilterableCard
        title='Discounts'
        category='Finances'
        icon={<DiscountsIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Discounts'
      />

      <FilterableCard
        title='Inflation'
        category='Finances'
        icon={<InflationIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Inflation'
      />

      <FilterableCard
        title='Interests'
        category='Finances'
        icon={<InterestIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Interests'
      />

      <FilterableCard
        title='Loan'
        category='Finances'
        icon={<LoanIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Loan'
      />

      <FilterableCard
        title='Percentage'
        category='Finances'
        icon={<PercentageIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Percentage'
      />

      <FilterableCard
        title='Taxes'
        category='Finances'
        icon={<TaxesIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Taxes'
      />

      <FilterableCard
        title='Tips'
        category='Finances'
        icon={<TipIcon size={52} color='#27AE60' />}
        route='/(pages)/(finances)/Tips'
      />
    </View>
  );
}
