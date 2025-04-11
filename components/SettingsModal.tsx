import { Modal, Pressable, Text, View, Linking, BackHandler } from 'react-native';
import { BugIcon, CloseIcon, InfoIcon, LanguageIcon, ProIcon, StarIcon, ThemeIcon } from './Icons';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const handleBackPress = () => {
      if (isLanguageModalVisible) {
        setIsLanguageModalVisible(false);
        return true;
      }
      if (isThemeModalVisible) {
        setIsThemeModalVisible(false);
        return true;
      }
      if (isAboutModalVisible) {
        setIsAboutModalVisible(false);
        return true;
      }
      if (isVisible) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, [isVisible, isLanguageModalVisible, isThemeModalVisible, isAboutModalVisible, onClose]);

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
      icon: <ThemeIcon size={42} color='#334155' />,
      onPress: handleThemeSelect,
    },
    {
      title: t('settings.changeLanguage'),
      icon: <LanguageIcon size={42} color='#334155' />,
      onPress: handleLanguageSelect,
    },
    {
      title: t('settings.about'),
      icon: <InfoIcon size={42} color='#334155' />,
      onPress: handleAboutModal,
    },
    {
      title: t('settings.rateApp'),
      icon: <StarIcon size={42} color='#FCD53F' />,
    },
    {
      title: t('settings.reportProblem'),
      icon: <BugIcon size={42} color='#334155' />,
      onPress: handleReportProblem,
    },
    {
      title: t('settings.updatePro'),
      icon: <ProIcon size={42} color='#334155' />,
    },
  ];

  return (
    <>
      <Modal
        animationType='slide'
        transparent={true}
        visible={
          isVisible && !isLanguageModalVisible && !isThemeModalVisible && !isAboutModalVisible
        }
        onRequestClose={onClose}>
        <Pressable className='flex-1 bg-black/40 justify-end' onPress={onClose}>
          <Pressable
            onPress={() => {}}
            className='bg-slate-700 rounded-t-3xl p-2'
            pointerEvents='box-none'>
            <View className='flex-row justify-between items-center mb-4 p-4'>
              <Text className='text-white text-2xl font-bold'>{t('settings.title')}</Text>
              <Pressable onPress={onClose}>
                <CloseIcon size={34} color='#E0E0E0' />
              </Pressable>
            </View>

            <View className='mx-auto flex-row justify-center flex-wrap items-center gap-4 mb-2'>
              {settingsOptions.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={option.onPress}
                  className='w-47 rounded-3xl h-40 overflow-hidden items-center justify-center bg-slate-400'>
                  <View className='rounded-lg justify-center items-center'>{option.icon}</View>
                  <Text className='text-white text-2xl font-Satoshi'>{option.title}</Text>
                </Pressable>
              ))}
            </View>
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
