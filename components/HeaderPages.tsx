import { Pressable, View } from 'react-native';
import { BackIcon, StarIcon } from './Icons';
import { useRouter } from 'expo-router';

export default function HeaderPages() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View className='flex-row justify-between p-5'>
      <Pressable onPress={handleBackPress}>
        <BackIcon />
      </Pressable>
    </View>
  );
}
