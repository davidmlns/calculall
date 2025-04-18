import { Modal, Pressable, Text, View, Image, StyleSheet, BackHandler } from 'react-native';
import { CloseIcon } from './Icons';
import profileImg from '../assets/images/profile.jpg';
import { t } from 'i18next';
import { useEffect } from 'react';

interface AboutModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  onClose: () => void;
}

export default function AboutModal({
  isVisible,
  onClose,
  onDismiss,
}: AboutModalProps): JSX.Element {
  useEffect(() => {
    const handleBackPress = () => {
      if (isVisible) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, [isVisible, onClose]);

  useEffect(() => {
    if (!isVisible) {
      onDismiss();
    }
  }, [isVisible, onDismiss]);
  return (
    <Modal animationType='slide' onRequestClose={onClose} transparent={false} visible={isVisible}>
      <View className='flex-1 bg-background-app'>
        <Pressable onPress={onClose} className='absolute top-4 right-4'>
          <CloseIcon size={32} color='#E0E0E0' />
        </Pressable>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={profileImg} style={styles.image} />
            <Text style={[styles.tag, styles.tagLeft]}>{t('aboutModal.job')}</Text>
            <Text style={[styles.tag, styles.tagRight]}>{t('aboutModal.country')}</Text>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>{t('aboutModal.contact')}</Text>
            <Text style={styles.contactText}>{t('aboutModal.location')}</Text>
            <Text style={styles.contactText}>{t('aboutModal.email')}</Text>
            <Text style={styles.contactText}>{t('aboutModal.phone')}</Text>
          </View>
        </View>

        <Text style={styles.versionText}>{t('aboutModal.version')}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40, // Increased padding for larger content
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#2F3B27',
    width: 300, // Increased width for larger image container
    height: 400, // Increased height for larger image container
    borderRadius: 20,
    padding: 30, // Increased padding for larger image container
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 250, // Increased image size
    height: 250, // Increased image size
    borderRadius: 100, // Adjusted for larger size
  },
  tag: {
    backgroundColor: '#E3A533',
    paddingVertical: 8, // Increased padding for larger tag
    paddingHorizontal: 20,
    borderRadius: 20,
    color: 'white',
    position: 'absolute',
    fontSize: 16, // Increased font size
  },
  tagLeft: {
    top: 20,
    left: -50,
  },
  tagRight: {
    bottom: 100,
    right: -30,
  },
  contactContainer: {
    backgroundColor: 'black',
    padding: 20, // Increased padding for larger contact container
    borderRadius: 15,
    marginTop: -30,
    alignItems: 'center',
  },
  contactTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22, // Increased font size
  },
  contactText: {
    color: 'white',
    marginTop: 10, // Increased margin for larger spacing
    fontSize: 18, // Increased font size
  },
  versionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});
