import { Link } from 'expo-router';
import { Pressable, View, Text } from 'react-native';

interface CardProps {
  title: string;
  category: string;
  icon: React.ReactNode;
  route: string;
}

export default function Card({ title, category, icon, route }: CardProps) {
  return (
    <View className='w-48 rounded-3xl h-36 bg-slate-300 overflow-hidden relative mb-5'>
      <Link asChild href={route}>
        <Pressable className='flex-col items-center h-full px-5 active:bg-slate-300 active:opacity-80 justify-center items-center'>
          <View className='mr-3'>{icon}</View>
          <View className='flex-col items-center'>
            <Text className='text font-semibold text-2xl '>{title}</Text>
            <Text className='text font-semibold text-lg'>{category}</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
