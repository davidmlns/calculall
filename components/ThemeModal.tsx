import { Modal, Pressable, Text, View } from 'react-native';
import { CloseIcon } from './Icons';
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ThemeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDismiss: () => void;
}

export default function ThemeModal({ isVisible, onClose, onDismiss }: ThemeModalProps) {
  const { setTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isVisible) {
      onDismiss();
    }
  }, [isVisible, onDismiss]);

  const colors = [
    {
      name: 'Light Mode',
      primary: '#cbd5e1',
      text: '#000000',
      textSec: '#505050',
      lineColor: '#000000',
      background: '#FFFFFF',
      icon: '#000000',
    },
    {
      name: 'Modern Minimal',
      primary: '#1E1E1E',
      text: '#E0E0E0',
      textSec: '#7A7A7A',
      lineColor: '#2D2D2D',
      background: '#121212',
      icon: '#E0E0E0',
    },
  ];

  const handleColorSelect = (color: {
    primary: string;
    text: string;
    background: string;
    icon: string;
    textSec: string;
    lineColor: string;
    name: string;
  }) => {
    setTheme({
      name: color.name,
      primary: color.primary,
      background: color.background,
      text: color.text,
      textSec: color.textSec,
      icon: color.icon,
      lineColor: color.lineColor,
    });
    onClose();
  };
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <Pressable className='flex-1 bg-black/40 justify-end' onPress={onClose}>
        <Pressable className='flex absolute bottom-0 w-full rounded-t-3xl bg-slate-700'>
          <View className='bg-background-secondary rounded-t-3xl p-6 h-1/2'>
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-white text-2xl font-bold'>{t('settings.selectTheme')}</Text>
              <Pressable onPress={onClose}>
                <CloseIcon size={26} color='#E0E0E0' />
              </Pressable>
            </View>
            <View className='space-y-3 flex-row flex-wrap justify-around gap-6'>
              {colors.map(color => (
                <Pressable
                  key={color.name}
                  onPress={() => handleColorSelect(color)}
                  className='w-20 h-20 rounded-full border-4 border-slate-200'
                  style={{ backgroundColor: color.primary }}
                />
              ))}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
