import { TextInput, View } from 'react-native';

interface ResultComponentProps {
  result: string;
  error?: string;
}

export default function ResultComponent({ result, error }: ResultComponentProps) {
  return (
    <View className='flex mb-4'>
      <TextInput
        placeholderTextColor='#c7c7c7'
        placeholder='The result will appear here'
        className='bg-gray-800 rounded-3xl p-4 text-2xl flex-wrap  w-96 h-24 mx-auto text-center text-slate-300'
        editable={false}
        selectTextOnFocus={false}
        value={result}
      />
    </View>
  );
}
