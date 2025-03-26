import { Modal, Pressable, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { CloseIcon } from './Icons';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDismiss: () => void;
  onLanguageSelected: (code: string) => void;
}

export default function LanguageModal({
  isVisible,
  onClose,
  onDismiss,
  onLanguageSelected,
}: LanguageModalProps) {
  useEffect(() => {
    if (!isVisible) {
      onDismiss();
    }
  }, [isVisible, onDismiss]);

  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'ES', name: 'Español' },
    { code: 'US', name: 'English' },
    { code: 'PT', name: 'Português' },
    { code: 'IT', name: 'Italiano' },
    { code: 'FR', name: 'Français' },
    { code: 'CN', name: '中文' },
  ];

  const handleLanguageSelect = (code: string) => {
    onLanguageSelected(code);
    i18n.changeLanguage(code.toLowerCase());
    onClose();
  };

  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <Pressable className='flex absolute bottom-0 w-full rounded-t-3xl bg-slate-700'>
        <View className='bg-background-secondary rounded-t-3xl p-6 h-1/2'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-white text-2xl font-bold'>Select Language</Text>
            <Pressable onPress={onClose} className='p-2'>
              <CloseIcon size={26} color='#E0E0E0' />
            </Pressable>
          </View>
          <View className='space-y-3 flex-row flex-wrap justify-around gap-6'>
            {languages.map(lang => (
              <Pressable
                key={lang.code}
                onPress={() => handleLanguageSelect(lang.code)} // Modificado
                className='flex-col items-center rounded-lg'>
                <CountryFlag isoCode={lang.code.toLowerCase()} size={62} />
                <Text className='text-white text-2xl font-bold ml-2'>{lang.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
