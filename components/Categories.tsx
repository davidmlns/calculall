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
    <View className='p-6' style={{ backgroundColor: theme.background }}>
      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.maths')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center'>
          {t('categoryName.maths')}
        </Text>
      )}
      <Maths />

      {isSearchVisible ? (
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: theme.lineColor,
            marginVertical: 8,
          }}
        />
      ) : (
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: theme.lineColor, marginVertical: 8 }}
        />
      )}

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.physical')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          {t('categoryName.physical')}
        </Text>
      )}
      <Physical />

      {isSearchVisible ? (
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: theme.lineColor,
            marginVertical: 8,
          }}
        />
      ) : (
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: theme.lineColor, marginVertical: 8 }}
        />
      )}

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.Health')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          {t('categoryName.Health')}
        </Text>
      )}
      <Health />

      {isSearchVisible ? (
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: theme.lineColor,
            marginVertical: 8,
          }}
        />
      ) : (
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: theme.lineColor, marginVertical: 8 }}
        />
      )}

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.Finances')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          {t('categoryName.Finances')}
        </Text>
      )}
      <FinanceEconomy />

      {isSearchVisible ? (
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: theme.lineColor,
            marginVertical: 8,
          }}
        />
      ) : (
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: theme.lineColor, marginVertical: 8 }}
        />
      )}

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.Transport')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          {t('categoryName.Transport')}
        </Text>
      )}
      <Transport />

      {isSearchVisible ? (
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: theme.lineColor,
            marginVertical: 8,
          }}
        />
      ) : (
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: theme.lineColor, marginVertical: 8 }}
        />
      )}

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.Technology')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          {t('categoryName.Technology')}
        </Text>
      )}
      <Technology />

      {isSearchVisible ? (
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: theme.lineColor,
            marginVertical: 8,
          }}
        />
      ) : (
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: theme.lineColor, marginVertical: 8 }}
        />
      )}

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.Geography')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          {t('categoryName.Geography')}
        </Text>
      )}
      <Geography />

      {isSearchVisible ? (
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: theme.lineColor,
            marginVertical: 8,
          }}
        />
      ) : (
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: theme.lineColor, marginVertical: 8 }}
        />
      )}

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.Kitchen')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          {t('categoryName.Kitchen')}
        </Text>
      )}
      <Kitchen />

      {isSearchVisible ? (
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: theme.lineColor,
            marginVertical: 8,
          }}
        />
      ) : (
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: theme.lineColor, marginVertical: 8 }}
        />
      )}

      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          {t('categoryName.Others')}
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          {t('categoryName.Others')}
        </Text>
      )}
      <Others />
    </View>
  );
}
