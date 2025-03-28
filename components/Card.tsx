import { Link, Href } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { StarFilledIcon } from './Icons';
import { useTheme } from '@/context/ThemeContext';

export default function Card({ title, category, icon, route, modalContent }: CardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { theme } = useTheme();

  const favoriteItem = { title, category, icon, route, modalContent };

  return (
    <View
      style={{ backgroundColor: theme.primary }}
      className='w-45 rounded-3xl h-36 overflow-hidden bgs relative'>
      <Pressable
        onPress={() => toggleFavorite(favoriteItem)}
        className='absolute bottom-2 right-2 p-1 z-10'>
        <StarFilledIcon size={28} color={isFavorite(favoriteItem) ? '#FF9427' : '#505050'} />
      </Pressable>

      <Link asChild href={route}>
        <Pressable className='flex-col items-center h-full px-5 active:bg-slate-300 active:opacity-80 justify-center items-center'>
          <View>{icon}</View>
          <View className='flex-col items-center'>
            <Text className='text font-semibold text-xl' style={{ color: theme.text }}>
              {title}
            </Text>
            <Text className=' font-semibold text-lg' style={{ color: theme.textSec }}>
              {category}
            </Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
