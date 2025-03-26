import { View } from 'react-native';
import Logo from './Logo';
import HeaderRight from './HeaderRight';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme } = useTheme();
  return (
    <View className='flex-row justify-between p-4' style={{ backgroundColor: theme.background }}>
      <Logo />
      <HeaderRight />
    </View>
  );
}
