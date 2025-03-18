import { View, Text } from 'react-native';

interface HeaderDescriptionPageProps {
  title: string;
  icon: React.ReactNode;
}

export default function HeaderDescriptionPage({ title, icon }: HeaderDescriptionPageProps) {
  return (
    <View className='flex-col items-center justify-center mx-auto mb-10'>
      <View className='bg-gray-800 rounded-3xl mb-4 w-20 h-20 justify-center items-center'>
        {icon}
      </View>

      <Text className='text-3xl font-semibold color-slate-400 mx-auto'>{title}</Text>
    </View>
  );
}
