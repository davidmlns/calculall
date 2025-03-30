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
    {
      name: 'Vibrant Coral',
      primary: '#FF6F61',
      text: '#FFFFFF',
      textSec: '#CCCCCC',
      lineColor: '#3A3A3A',
      background: '#121212',
      icon: '#FFFFFF',
    },
    {
      name: 'Electric Blue',
      primary: '#B0B0FF',
      text: '#2E2E3A',
      textSec: '#6E6E8A',
      lineColor: '#D0D0FF',
      background: '#F8F9FF',
      icon: '#7A7AFF',
    },
    {
      name: 'Sunset Gradient',
      primary: '#FF9A9E',
      text: '#333333',
      textSec: '#777777',
      lineColor: '#FFCCD1',
      background: '#FFF5F5',
      icon: '#FF6B7F',
    },
    {
      name: 'Urban Chic',
      primary: '#343a40',
      text: '#F8F9FA',
      textSec: '#ADB5BD',
      lineColor: '#495057',
      background: '#212529',
      icon: '#4DABF7',
    },
    {
      name: 'Muted Earth',
      primary: '#9C6644',
      text: '#3E3E3E',
      textSec: '#6D4C41',
      lineColor: '#D7CCC8',
      background: '#F5E6E0',
      icon: '#9C6644',
    },
    {
      name: 'Minty Fresh',
      primary: '#20C997',
      text: '#212529',
      textSec: '#495057',
      lineColor: '#D1F2E8',
      background: '#F8F9FA',
      icon: '#20C997',
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
      <Pressable className='flex absolute bottom-0 w-full rounded-t-3xl bg-slate-700'>
        <View className='bg-background-secondary rounded-t-3xl p-6 h-1/2'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-white text-2xl font-bold'>{t('settings.selectTheme')}</Text>
            <Pressable onPress={onClose} className='p-2'>
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
    </Modal>
  );
}
