import { Pressable, Text, View } from 'react-native';

export default function CalculateBtn() {
  return (
    <View>
      <Pressable className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
        <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
      </Pressable>
    </View>
  );
}
