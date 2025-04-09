import { Link, Href } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { StarFilledIcon } from './Icons';
import { useTheme } from '@/context/ThemeContext';
import { getIconComponent, IconType } from './Icons';

interface CardProps {
  id: string;
  title: string;
  icon: IconType;
  iconSize?: number;
  iconColor?: string;
  route: string;
}

export default function Card({ id, title, icon, route, iconSize, iconColor }: CardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { theme } = useTheme();

  const favoriteItem = { title, icon, route };

  return (
    <View
      style={{ backgroundColor: theme.primary }}
      className='w-47 rounded-3xl h-40 overflow-hidden relative'>
      <Pressable
        onPress={() => toggleFavorite({ ...favoriteItem, iconSize, iconColor })}
        className='absolute top-2 right-2 z-10'>
        <StarFilledIcon size={34} color={isFavorite(favoriteItem) ? '#FF9427' : '#505050'} />
      </Pressable>

      <Link asChild href={route}>
        <Pressable className='flex-col items-center h-full px-5 active:bg-slate-300 active:opacity-80 justify-center items-center'>
          <View>{getIconComponent(icon, iconSize, iconColor)}</View>
          <View className='mt-2 flex-col items-center'>
            <Text
              className='font-Satoshi font-normal text-center text-2xl'
              style={{ color: theme.text }}>
              {title}
            </Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
