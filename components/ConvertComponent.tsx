import { Text, TextInput, View } from 'react-native';

interface ConvertComponentProps {
  title: string;
  description: string;
  abb: string;
  value: string;
  isActive: boolean;
  onChangeText: (value: string) => void;
  onPress?: () => void;
}

export default function ConvertComponent({
  title,
  description,
  abb,
  value,
  isActive,
  onChangeText,
  onPress,
}: ConvertComponentProps) {
  return (
    <View className='flex-row mx-auto mt-4 justify-between items-center bg-gray-800 rounded-lg pr-3 pl-3 w-10/12 h-20'>
      <View className='flex-row items-center'>
        <View
          className={`rounded-lg p-1.5 px-3 ml-2 mr-4 ${
            isActive ? 'bg-blue-500' : 'bg-icon-background'
          }`}>
          <Text className={`font-semibold text-2xl ${isActive ? 'text-white' : 'text-black'}`}>
            {abb}
          </Text>
        </View>
        <View className=''>
          <Text className='text-slate-300 font-semibold text-sm'>{title}</Text>
          <Text className='text-slate-300 font-semibold text-xs'>{description}</Text>
        </View>
      </View>
      <TextInput
        className='text-right text-xl text-slate-300'
        placeholder='0'
        placeholderTextColor='#cbd5e1'
        keyboardType='number-pad'
        value={value}
        onChangeText={text => onChangeText(text)}
        onPress={onPress}
        style={{
          alignSelf: 'flex-end',
          textAlign: 'right',
        }}
        maxLength={10}
      />
    </View>
  );
}
