import { Modal, Pressable, Text, View } from 'react-native';
import { BugIcon, CloseIcon, InfoIcon, LanguageIcon, StarIcon, ThemeIcon } from './Icons';
import { useState } from 'react';
import LanguageModal from './LanguageModal';
import ThemeModal from './ThemeModal';
import { useTranslation } from 'react-i18next';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isVisible, onClose }: SettingsModalProps) {
  const { t } = useTranslation();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState<boolean>(false);
  const [isThemeModalVisible, setIsThemeModalVisible] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState(true);

  const handleLanguageSelect = () => {
    setShowSettings(false);
    setIsThemeModalVisible(false);
    setIsLanguageModalVisible(true);
  };

  const handleThemeSelect = () => {
    setShowSettings(false);
    setIsLanguageModalVisible(false);
    setIsThemeModalVisible(true);
  };

  const handleLanguageChange = (languageCode: string) => {
    // Your language change logic here
    console.log('Changing to language:', languageCode);
    // Example with i18n:
    // i18n.changeLanguage(languageCode);
  };

  const handleModalClose = () => {
    setShowSettings(true);
  };

  const settingsOptions = [
    {
      title: t('settings.changeTheme'),
      icon: <ThemeIcon size={30} color='#E0E0E0' />,
      onPress: handleThemeSelect,
    },
    {
      title: t('settings.changeLanguage'),
      icon: <LanguageIcon size={30} color='#E0E0E0' />,
      onPress: handleLanguageSelect,
    },
    {
      title: t('settings.about'),
      icon: <InfoIcon size={30} color='#E0E0E0' />,
    },
    {
      title: t('settings.rateApp'),
      icon: <StarIcon size={30} color='#FCD53F' />,
    },
    {
      title: t('settings.reportProblem'),
      icon: <BugIcon size={30} color='#E0E0E0' />,
    },
  ];

  return (
    <>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible && !isLanguageModalVisible && !isThemeModalVisible}>
        <Pressable className='flex absolute bottom-0 w-full rounded-t-3xl bg-slate-700'>
          <View className='bg-background-secondary rounded-t-3xl p-4 h-1/2'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-white text-2xl font-bold'>{t('settings.title')}</Text>
              <Pressable onPress={onClose}>
                <CloseIcon size={34} color='#E0E0E0' />
              </Pressable>
            </View>
            {settingsOptions.map((option, index) => (
              <Pressable
                key={index}
                onPress={option.onPress}
                className='flex-row items-center py-3 border-b border-slate-600'>
                <View className='mr-3  w-10 h-10 rounded-lg justify-center items-center'>
                  {option.icon}
                </View>
                <Text className='text-white text-xl'>{option.title}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
      <LanguageModal
        isVisible={isLanguageModalVisible}
        onClose={() => setIsLanguageModalVisible(false)}
        onDismiss={handleModalClose}
        onLanguageSelected={handleLanguageChange}
      />
      <ThemeModal
        isVisible={isThemeModalVisible}
        onClose={() => setIsThemeModalVisible(false)}
        onDismiss={handleModalClose}
      />
    </>
  );
}
