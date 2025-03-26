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

export default function Categories() {
  const { isSearchVisible, setIsSearchVisible } = useSearch();
  const { theme } = useTheme();

  return (
    <View className='p-6' style={{ backgroundColor: theme.background }}>
      {isSearchVisible ? (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center hidden'>
          Maths
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center'>
          Maths
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
          Physical
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          Physical
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
          Health
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          Health
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
          Finance & Economy
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          Finance & Economy
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
          Transport
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          Transport
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
          Technology & Electronics
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          Technology & Electronics
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
          Geography
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          Geography
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
          Kitchen
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          Kitchen
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
          Others
        </Text>
      ) : (
        <Text style={{ color: theme.text }} className='text-3xl font-semibold text-center mt-3'>
          Others
        </Text>
      )}
      <Others />
    </View>
  );
}
