import { TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
interface ResultComponentProps {
  result: string;
  error?: string;
}

export default function ResultComponent({ result, error }: ResultComponentProps) {
  const { t } = useTranslation();

  return (
    <View className='flex mb-4 w-96 mx-auto'>
      <TextInput
        placeholderTextColor='#c7c7c7'
        placeholder={t('resultComponent.placeholder')}
        className='bg-gray-800 rounded-3xl p-4 text-2xl flex-wrap  w-96 h-24 mx-auto text-center text-slate-300 font-Satoshi'
        editable={false}
        selectTextOnFocus={false}
        value={result}
      />
    </View>
  );
}
