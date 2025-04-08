import { Animated, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { CloseIcon, SearchIcon, SettingIcon } from './Icons';
import { useSearch } from '../context/SearchContext';
import SettingsModal from './SettingsModal';
import { useTheme } from '@/context/ThemeContext';
import { t } from 'i18next';

export default function HeaderRight() {
  const { searchText, setSearchText, isSearchVisible, setIsSearchVisible } = useSearch();
  const animation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [borderColor, setBorderColor] = useState('#000000');
  const { theme } = useTheme();

  useEffect(() => {
    if (theme.name === 'Light Mode') {
      setBorderColor('#000000');
    } else if (theme.name === 'Modern Minimal') {
      setBorderColor('#FFFFFF');
    } else if (theme.name === 'Vibrant Coral') {
      setBorderColor('#FFFFFF');
    } else if (theme.name === 'Electric Blue') {
      setBorderColor('#000000');
    } else if (theme.name === 'Urban Chic') {
      setBorderColor('#FFFFFF');
    } else if (theme.name === 'Muted Earth') {
      setBorderColor('#000000');
    } else if (theme.name === 'Minty Fresh') {
      setBorderColor('#212529');
    }
  }, [theme]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setSearchText('');
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isSearchVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Enfocar automáticamente cuando se muestra
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <View className='flex-row items-center' style={{ backgroundColor: theme.background }}>
      {isSearchVisible && (
        <Animated.View style={animatedStyle}>
          <TextInput
            ref={inputRef}
            placeholder={t('searchInput.placeholder')}
            placeholderTextColor={theme.text}
            style={{
              marginRight: 6,
              marginLeft: 10,
              height: 40,
              width: 265,
              fontSize: 20,
              padding: 2,
              paddingLeft: 10,
              borderColor: borderColor,
              textAlignVertical: 'center',
              borderStyle: 'solid',
              borderRadius: 8,
              borderWidth: 2,
            }}
            value={searchText}
            onChangeText={setSearchText}
            className='z-5'
          />
        </Animated.View>
      )}

      <Pressable
        className='mr-5 z-10'
        style={[styles.searchIcon, isSearchVisible ? styles.searchIconActive : undefined]}
        onPress={toggleSearch}>
        {isSearchVisible ? (
          <CloseIcon size={36} color={theme.icon} />
        ) : (
          <SearchIcon size={36} color={theme.icon} />
        )}
      </Pressable>

      {isSearchVisible ? (
        <Pressable className='hidden' onPress={() => setShowSettingsModal(true)}>
          <SettingIcon size={34} color={theme.icon} />
        </Pressable>
      ) : (
        <Pressable onPress={() => setShowSettingsModal(true)}>
          <SettingIcon size={34} color={theme.icon} />
        </Pressable>
      )}
      <SettingsModal isVisible={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {},
  searchIcon: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  searchIconActive: {
    backgroundColor: 'transparent',
    color: '#F86868',
  },
});
