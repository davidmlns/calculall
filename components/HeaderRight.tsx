import { Animated, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { CloseIcon, SearchIcon, SettingIcon } from './Icons';
import { Link } from 'expo-router';

export default function HeaderRight() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const animation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
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
        style={[styles.searchIcon, isSearchVisible && styles.searchIconActive]}
        onPress={toggleSearch}>
        {isSearchVisible ? <CloseIcon /> : <SearchIcon />}
      </Pressable>

      <Link asChild href=''>
        <Pressable>
          <SettingIcon />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginRight: 5,
    height: 40,
    width: 300,
    fontSize: 18,
    color: '#E0E0E0',
    padding: 2,
    paddingLeft: 10,
    textAlignVertical: 'center',
    borderStyle: 'solid',
    borderColor: '#E0E0E0',
    borderRadius: 5,
    borderWidth: 1,
  },
  searchIcon: {
    borderWidth: 0,
  },
  searchIconActive: {
    color: '#F86868',
  },
});
