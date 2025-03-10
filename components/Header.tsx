import { View } from 'react-native';
import Logo from './Logo';
import HeaderRight from './HeaderRight';

export default function Header() {
  return (
    <View className='flex-row bg-background-app justify-between p-4'>
      <Logo />
      <HeaderRight />
    </View>
  );
}
