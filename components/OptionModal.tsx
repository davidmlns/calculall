import { Modal, Pressable, Text, View } from 'react-native';
import { ArrowDownIcon, CloseIcon } from './Icons';

interface OptionModalProps {
  options: {
    title: string;
    description?: string;
    icon: string;
    route: string;
  }[];
  isVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function OptionModal({
  options,
  isVisible,
  onClose,
  onOpen,
}: OptionModalProps) {
  return (
    <>
      {options.map((option, index) => (
        <Pressable
          key={index}
          onPress={onOpen} // Usar prop onOpen en lugar de estado interno
          className='bg-background-secondary rounded-xl p-6 flex-row justify-between'>
          <View className='flex-row items-center'>
            <Text className='mr-3 bg-icon-background w-10 h-10 rounded-lg'>{option.icon}</Text>
            <View>
              <Text className='text-white text-base'>{option.title}</Text>
              <Text className='text-slate-400 text-sm'>{option.description}</Text>
            </View>
          </View>
          <ArrowDownIcon size={34} color='#E0E0E0' />
        </Pressable>
      ))}

      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible} // Usar prop isVisible
      >
        <Pressable className='flex absolute bottom-0 w-full rounded-t-3xl bg-slate-700'>
          <View className='bg-background-secondary rounded-t-3xl p-4 h-1/2'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-white text-2xl font-bold'>Select Operation</Text>
              <Pressable onPress={onClose}>
                <CloseIcon size={34} color='#E0E0E0' />
              </Pressable>
            </View>
            {options.map((option, index) => (
              <View key={index}>
                <Text className='text-white text-base'>{option.title}</Text>
                <Text className='text-slate-400 text-sm'>{option.description}</Text>
              </View>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
