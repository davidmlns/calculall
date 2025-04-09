import { View } from 'react-native';
import Logo from './Logo';
import HeaderRight from './HeaderRight';
import { useTheme } from '@/context/ThemeContext';
import SearchComponent from './SearchComponent';

export default function Header() {
  const { theme } = useTheme();
  return (
    <View className='flex-col mb-2'>
      <View className='flex-row p-4 items-center justify-between'>
        <Logo />
        <HeaderRight />
      </View>
      <SearchComponent />
    </View>
  );
}
