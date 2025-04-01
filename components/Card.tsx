import { Link, Href } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { StarFilledIcon } from './Icons';
import { useTheme } from '@/context/ThemeContext';
import { getIconComponent, IconType } from './Icons';

interface CardProps {
  id: string;
  title: string;
  category: string;
  icon: IconType;
  iconSize?: number;
  iconColor?: string;
  route: string;
}

export default function Card({ id, title, category, icon, route, iconSize, iconColor }: CardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { theme } = useTheme();

  const favoriteItem = { title, category, icon, route };

  return (
    <View
      style={{ backgroundColor: theme.primary }}
      className='w-45 rounded-3xl h-36 overflow-hidden bgs relative'>
      <Pressable
        onPress={() => toggleFavorite({ ...favoriteItem, iconSize, iconColor })}
        className='absolute top-2 right-2 p-1 z-10'>
        <StarFilledIcon size={28} color={isFavorite(favoriteItem) ? '#FF9427' : '#505050'} />
      </Pressable>

      <Link asChild href={route}>
        <Pressable className='flex-col items-center h-full px-5 active:bg-slate-300 active:opacity-80 justify-center items-center'>
          <View>{getIconComponent(icon, iconSize, iconColor)}</View>
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
