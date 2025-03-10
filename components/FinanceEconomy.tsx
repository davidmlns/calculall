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
    <View className='mt-6 flex-row flex-wrap justify-around'>
      <Card
        title='Budgeting'
        category='Finances'
        icon={<BudgetingIcon size={44} color='#27AE60' />}
        route='/'
      />

      <Card
        title='Discounts'
        category='Finances'
        icon={<DiscountsIcon size={44} color='#27AE60' />}
        route='/'
      />

      <Card
        title='Inflation'
        category='Finances'
        icon={<InflationIcon size={44} color='#27AE60' />}
        route='/'
      />

      <Card
        title='Interests'
        category='Finances'
        icon={<InterestIcon size={44} color='#27AE60' />}
        route='/'
      />

      <Card
        title='Loan'
        category='Finances'
        icon={<LoanIcon size={44} color='#27AE60' />}
        route='/'
      />

      <Card
        title='Percentage'
        category='Finances'
        icon={<PercentageIcon size={44} color='#27AE60' />}
        route='/'
      />

      <Card
        title='Taxes'
        category='Finances'
        icon={<TaxesIcon size={44} color='#27AE60' />}
        route='/'
      />

      <Card
        title='Tips'
        category='Finances'
        icon={<TipIcon size={44} color='#27AE60' />}
        route='/'
      />
    </View>
  );
}
