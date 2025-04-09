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
import { useTheme } from '@/context/ThemeContext';
import { useSearch } from '../context/SearchContext';
import { useTranslation } from 'react-i18next';

export default function Categories() {
  const { t } = useTranslation();
  const { isSearchVisible, setIsSearchVisible } = useSearch();
  const { theme } = useTheme();

  return (
    <View className='p-2'>
      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.maths')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.maths')}
        </Text>
      )}
      <Maths />

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.physical')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.physical')}
        </Text>
      )}
      <Physical />

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.Health')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.Health')}
        </Text>
      )}
      <Health />

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.Finances')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.Finances')}
        </Text>
      )}
      <FinanceEconomy />

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.Transport')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.Transport')}
        </Text>
      )}
      <Transport />

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.Technology')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.Technology')}
        </Text>
      )}
      <Technology />

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.Geography')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.Geography')}
        </Text>
      )}
      <Geography />

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.Kitchen')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.Kitchen')}
        </Text>
      )}
      <Kitchen />

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold ml-4 hidden'>
          {t('categoryName.Others')}
        </Text>
      ) : (
        <Text
          style={{ color: theme.text }}
          className='text-4xl font-semibold ml-4 mt-12 font-Satoshi'>
          {t('categoryName.Others')}
        </Text>
      )}
      <Others />
    </View>
  );
}
