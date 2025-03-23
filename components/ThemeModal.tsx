import { Modal, Pressable, Text, View } from 'react-native';
import { CloseIcon } from './Icons';
import { useEffect } from 'react';

interface ThemeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDismiss: () => void;
}

export default function ThemeModal({ isVisible, onClose, onDismiss }: ThemeModalProps) {
  useEffect(() => {
    if (!isVisible) {
      onDismiss();
    }
  }, [isVisible]);

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Purple', value: '#800080' },
    { name: 'Pink', value: '#FFC0CB' },
    { name: 'Yellow', value: '#FFFF00' },
  ];

  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <Pressable className='flex absolute bottom-0 w-full rounded-t-3xl bg-slate-700'>
        <View className='bg-background-secondary rounded-t-3xl p-6 h-1/2'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-white text-2xl font-bold'>Select Theme</Text>
            <Pressable onPress={onClose} className='p-2'>
              <CloseIcon size={26} color='#E0E0E0' />
            </Pressable>
          </View>
          <View className='space-y-3 flex-row flex-wrap justify-around gap-6'>
            {colors.map(color => (
              <Pressable
                key={color.name}
                onPress={onClose}
                className='w-20 h-20 rounded-full border-4 border-slate-200'
                style={{ backgroundColor: color.value }}
              />
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
