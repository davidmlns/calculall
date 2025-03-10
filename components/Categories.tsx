import { View, Text } from 'react-native';
import Maths from './Maths';
import Physical from './Physical';
import Health from './Health';
import FinanceEconomy from './FinanceEconomy';
import Transport from './Transport';
import Technology from './Technology';
import Geography from './Geography';
import Kitchen from './Kitchen';
import Others from './Others';

export default function Categories() {
  return (
    <View className='mt-4 p-6'>
      <Text className='text-3xl color-slate-300'>Maths</Text>
      <Maths />

      <Text className='text-3xl color-slate-300 mt-5'>Physical</Text>
      <Physical />

      <Text className='text-3xl color-slate-300 mt-5'>Health</Text>
      <Health />

      <Text className='text-3xl color-slate-300 mt-5'>Finance & Economy</Text>
      <FinanceEconomy />

      <Text className='text-3xl color-slate-300 mt-5'>Transport</Text>
      <Transport />

      <Text className='text-3xl color-slate-300 mt-5'>Technology & Electronics</Text>
      <Technology />

      <Text className='text-3xl color-slate-300 mt-5'>Geography</Text>
      <Geography />

      <Text className='text-3xl color-slate-300 mt-5'>Kitchen</Text>
      <Kitchen />

      <Text className='text-3xl color-slate-300 mt-5'>Others</Text>
      <Others />
    </View>
  );
}
