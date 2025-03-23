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
import { useSearch } from '../context/SearchContext';

export default function Categories() {
  const { isSearchVisible, setIsSearchVisible } = useSearch();
  console.log(isSearchVisible);
  return (
    <View className='mt-4 p-6'>
      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Maths</Text>
      ) : (
        <Text className='text-3xl color-slate-300'>Maths</Text>
      )}
      <Maths />

      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Physical</Text>
      ) : (
        <Text className='text-3xl color-slate-300 mt-5'>Physical</Text>
      )}
      <Physical />

      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Health</Text>
      ) : (
        <Text className='text-3xl color-slate-300 mt-5'>Health</Text>
      )}
      <Health />

      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Finance & Economy</Text>
      ) : (
        <Text className='text-3xl color-slate-300 mt-5'>Finance & Economy</Text>
      )}
      <FinanceEconomy />

      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Transport</Text>
      ) : (
        <Text className='text-3xl color-slate-300 mt-5'>Transport</Text>
      )}
      <Transport />

      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Technology & Electronics</Text>
      ) : (
        <Text className='text-3xl color-slate-300 mt-5'>Technology & Electronics</Text>
      )}
      <Technology />

      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Geography</Text>
      ) : (
        <Text className='text-3xl color-slate-300 mt-5'>Geography</Text>
      )}
      <Geography />

      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Kitchen</Text>
      ) : (
        <Text className='text-3xl color-slate-300 mt-5'>Kitchen</Text>
      )}
      <Kitchen />

      {isSearchVisible ? (
        <Text className='text-3xl color-slate-300 hidden'>Others</Text>
      ) : (
        <Text className='text-3xl color-slate-300 mt-5'>Others</Text>
      )}
      <Others />
    </View>
  );
}
