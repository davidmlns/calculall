import { Modal, Pressable, Text, View, Linking } from 'react-native';
import { BugIcon, CloseIcon, InfoIcon, LanguageIcon, StarIcon, ThemeIcon } from './Icons';
import { useState } from 'react';
import LanguageModal from './LanguageModal';
import ThemeModal from './ThemeModal';
import { useTranslation } from 'react-i18next';
import AboutModal from './AboutModal';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isVisible, onClose }: SettingsModalProps) {
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(true);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState<boolean>(false);
  const [isThemeModalVisible, setIsThemeModalVisible] = useState<boolean>(false);
  const [isAboutModalVisible, setIsAboutModalVisible] = useState<boolean>(false);

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

  const handleAboutModal = () => {
    setShowSettings(false);
    setIsAboutModalVisible(true);
  };

  const handleLanguageChange = (languageCode: string) => {
    setIsLanguageModalVisible(false);
  };

  const handleModalClose = () => {
    setShowSettings(true);
  };

  const handleReportProblem = async () => {
    const email = 'Calculallapp@gmail.com';
    const subject = encodeURIComponent(t('email.subject'));
    const body = encodeURIComponent(t('email.body'));

    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    try {
      const supported = await Linking.canOpenURL(mailtoUrl);

      if (supported) {
        await Linking.openURL(mailtoUrl);
      } else {
        console.log(t('email.emailOpenError'));
      }
    } catch (error) {
      console.error(t('email.emailOpenError'), error);
    }
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
      onPress: handleAboutModal,
    },
    {
      title: t('settings.rateApp'),
      icon: <StarIcon size={30} color='#FCD53F' />,
    },
    {
      title: t('settings.reportProblem'),
      icon: <BugIcon size={30} color='#E0E0E0' />,
      onPress: handleReportProblem,
    },
  ];

  return (
    <>
      <Modal
        animationType='slide'
        transparent={true}
        visible={
          isVisible && !isLanguageModalVisible && !isThemeModalVisible && !isAboutModalVisible
        }>
        <Pressable className='flex-1 bg-black/40 justify-end' onPress={onClose}>
          <Pressable
            onPress={() => {}}
            className='bg-slate-700 rounded-t-3xl p-4'
            pointerEvents='box-none'>
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
                <View className='mr-3 w-10 h-10 rounded-lg justify-center items-center'>
                  {option.icon}
                </View>
                <Text className='text-white text-xl'>{option.title}</Text>
              </Pressable>
            ))}
          </Pressable>
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
      <AboutModal
        isVisible={isAboutModalVisible}
        onClose={() => setIsAboutModalVisible(false)}
        onDismiss={handleModalClose}
      />
    </>
  );
}
