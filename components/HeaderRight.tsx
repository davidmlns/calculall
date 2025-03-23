import { Animated, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { CloseIcon, SearchIcon, SettingIcon } from './Icons';
import { Link } from 'expo-router';
import { useSearch } from '../context/SearchContext';
import SettingsModal from './SettingsModal';

export default function HeaderRight() {
  const { searchText, setSearchText, isSearchVisible, setIsSearchVisible } = useSearch();
  const animation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

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
    <View className='flex-row items-center'>
      {isSearchVisible && (
        <Animated.View style={animatedStyle}>
          <TextInput
            ref={inputRef}
            placeholder='Search...'
            placeholderTextColor='#E0E0E0'
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            className='z-5'
          />
        </Animated.View>
      )}

      <Pressable
        className='mr-5 bg-background-app z-10'
        style={[styles.searchIcon, isSearchVisible ? styles.searchIconActive : undefined]}
        onPress={toggleSearch}>
        {isSearchVisible ? (
          <CloseIcon size={36} color='#fff' />
        ) : (
          <SearchIcon size={24} color='#fff' />
        )}
      </Pressable>

      {isSearchVisible ? (
        <Link asChild href='/'>
          <Pressable className='hidden' onPress={() => setIsSettingsVisible(true)}>
            <SettingIcon />
          </Pressable>
        </Link>
      ) : (
        <Link asChild href='/'>
          <Pressable onPress={() => setIsSettingsVisible(true)}>
            <SettingIcon />
          </Pressable>
        </Link>
      )}
      <SettingsModal isVisible={isSettingsVisible} onClose={() => setIsSettingsVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginRight: 6,
    marginLeft: 10,
    height: 40,
    width: 265,
    fontSize: 20,
    color: '#E0E0E0',
    padding: 2,
    paddingLeft: 10,
    textAlignVertical: 'center',
    borderStyle: 'solid',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    borderWidth: 2,
  },
  searchIcon: {
    borderWidth: 0,
  },
  searchIconActive: {
    backgroundColor: 'transparent',
    color: '#F86868',
  },
});
