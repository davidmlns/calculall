import { View } from 'react-native';
import Card from './Card';
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
      <Card
        title='Budgeting'
        category='Finances'
        icon={<BudgetingIcon size={44} color='#27AE60' />}
        route='/(pages)/(finances)/Budgeting'
      />

      <Card
        title='Discounts'
        category='Finances'
        icon={<DiscountsIcon size={44} color='#27AE60' />}
        route='/(pages)/(finances)/Discounts'
      />

      <Card
        title='Inflation'
        category='Finances'
        icon={<InflationIcon size={44} color='#27AE60' />}
        route='/(pages)/(finances)/Inflation'
      />

      <Card
        title='Interests'
        category='Finances'
        icon={<InterestIcon size={44} color='#27AE60' />}
        route='/(pages)/(finances)/Interests'
      />

      <Card
        title='Loan'
        category='Finances'
        icon={<LoanIcon size={44} color='#27AE60' />}
        route='/(pages)/(finances)/Loan'
      />

      <Card
        title='Percentage'
        category='Finances'
        icon={<PercentageIcon size={44} color='#27AE60' />}
        route='/(pages)/(finances)/Percentage'
      />

      <Card
        title='Taxes'
        category='Finances'
        icon={<TaxesIcon size={44} color='#27AE60' />}
        route='/(pages)/(finances)/Taxes'
      />

      <Card
        title='Tips'
        category='Finances'
        icon={<TipIcon size={44} color='#27AE60' />}
        route='/(pages)/(finances)/Tips'
      />
    </View>
  );
}
