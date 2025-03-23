import { Link, Href } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { StarFilledIcon } from './Icons';

export default function Card({ title, category, icon, route, modalContent }: CardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favoriteItem = { title, category, icon, route, modalContent };

  return (
    <View className='w-45 rounded-3xl h-36 bg-slate-300 overflow-hidden relative'>
      <Pressable
        onPress={() => toggleFavorite(favoriteItem)}
        className='absolute top-2 right-2 p-1 z-10'>
        <StarFilledIcon size={24} color={isFavorite(favoriteItem) ? '#FF9427' : '#505050'} />
      </Pressable>

      <Link asChild href={route}>
        <Pressable className='flex-col items-center h-full px-5 active:bg-slate-300 active:opacity-80 justify-center items-center'>
          <View className='mr-3'>{icon}</View>
          <View className='flex-col items-center'>
            <Text className='text font-semibold text-xl '>{title}</Text>
            <Text className='text-slate-600 font-semibold text-lg'>{category}</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
