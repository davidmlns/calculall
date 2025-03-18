import { Link, Href } from 'expo-router';
import { Pressable, View, Text } from 'react-native';

interface CardProps {
  title: string;
  category: string;
  icon: React.ReactNode;
  route: string;
}

export default function Card({ title, category, icon, route }: CardProps) {
  return (
    <View className='w-45 rounded-3xl h-36 bg-slate-300 overflow-hidden relative'>
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
