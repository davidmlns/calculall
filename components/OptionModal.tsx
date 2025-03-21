import { Modal, Pressable, Text, View } from 'react-native';
import { ArrowDownIcon, CloseIcon } from './Icons';

interface OptionModalProps {
  title: string;
  description?: string;
  icon: string;
  isVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
}

export default function OptionModal({
  title,
  description,
  icon,
  isVisible,
  onClose,
  onOpen,
  children,
}: OptionModalProps) {
  return (
    <>
      <Pressable
        onPress={onOpen}
        className='bg-background-secondary w-90 mx-auto rounded-xl p-6 flex-row justify-between'>
        <View className='flex-row items-center'>
          <Text className='mr-3 bg-icon-background w-10 h-10 rounded-lg text-center'>
            {icon || 'Icon'}
          </Text>
          <View>
            <Text className='text-white text-base'>{title || 'Select an option'}</Text>
            <Text className='text-slate-400 text-sm'>
              {description || 'Tap to choose an operation'}
            </Text>
          </View>
        </View>
        <ArrowDownIcon size={34} color='#E0E0E0' />
      </Pressable>

      <Modal animationType='slide' transparent={true} visible={isVisible}>
        <Pressable className='flex absolute bottom-0 w-full rounded-t-3xl bg-slate-700'>
          <View className='bg-background-secondary rounded-t-3xl p-4 h-1/2'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-white text-2xl font-bold'>Select Operation</Text>
              <Pressable onPress={onClose}>
                <CloseIcon size={34} color='#E0E0E0' />
              </Pressable>
            </View>
            {children}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
