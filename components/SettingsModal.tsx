import { Modal, Pressable, Text, View } from 'react-native';
import { BugIcon, CloseIcon, InfoIcon, LanguageIcon, StarIcon, ThemeIcon } from './Icons';
import { useState } from 'react';
import LanguageModal from './LanguageModal';
import ThemeModal from './ThemeModal';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isVisible, onClose }: SettingsModalProps) {
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState<boolean>(false);
  const [isThemeModalVisible, setIsThemeModalVisible] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState(true);

  const handleLanguageSelect = () => {
    setShowSettings(false);
    setIsLanguageModalVisible(true);
  };

  const handleThemeSelect = () => {
    setShowSettings(false);
    setIsThemeModalVisible(true);
  };

  const handleModalClose = () => {
    setShowSettings(true);
  };

  const settingsOptions = [
    {
      title: 'Change app theme',
      icon: <ThemeIcon size={30} color='#000000' />,
      onPress: handleThemeSelect,
    },
    {
      title: 'Change language',
      icon: <LanguageIcon size={30} color='#000000' />,
      onPress: handleLanguageSelect,
    },
    { title: 'About', icon: <InfoIcon size={30} color='#000000' /> },
    { title: 'Rate app', icon: <StarIcon size={30} color='#FCD53F' /> },
    { title: 'Report a problem', icon: <BugIcon size={30} color='#000000' /> },
  ];

  return (
    <>
      {showSettings && (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
          <Pressable className='flex absolute bottom-0 w-full rounded-t-3xl bg-slate-700'>
            <View className='bg-background-secondary rounded-t-3xl p-4 h-1/2'>
              <View className='flex-row justify-between items-center mb-2'>
                <Text className='text-white text-2xl font-bold'>Configuración</Text>
                <Pressable onPress={onClose}>
                  <CloseIcon size={34} color='#E0E0E0' />
                </Pressable>
              </View>
              {settingsOptions.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={option.onPress}
                  className='flex-row items-center py-3 border-b border-slate-600'>
                  <View className='mr-3 bg-icon-background w-10 h-10 rounded-lg justify-center items-center'>
                    {option.icon}
                  </View>
                  <Text className='text-white text-lg'>{option.title}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>
      )}
      <LanguageModal
        isVisible={isLanguageModalVisible}
        onClose={() => setIsLanguageModalVisible(false)}
        onDismiss={handleModalClose}
      />
      <ThemeModal
        isVisible={isThemeModalVisible}
        onClose={() => setIsThemeModalVisible(false)}
        onDismiss={handleModalClose}
      />
    </>
  );
}
