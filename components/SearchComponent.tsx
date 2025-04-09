import { TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SearchComponent() {
  const { t } = useTranslation();
  const [borderColor, setBorderColor] = useState('#000000');
  const inputRef = useRef(null);
  const { searchText, setSearchText, isSearchVisible, setIsSearchVisible } = useSearch();
  const { theme } = useTheme();

  useEffect(() => {
    if (theme.name === 'Light Mode') {
      setBorderColor('#000000');
    } else if (theme.name === 'Modern Minimal') {
      setBorderColor('#FFFFFF');
    }
  }, [theme]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setSearchText('');
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(); // Dismiss the keyboard
        setIsSearchVisible(false); // Hide the search input
      }}>
      <View className='w-full items-center' style={{ backgroundColor: theme.background }}>
        <TextInput
          ref={inputRef}
          placeholder={t('searchInput.placeholder')}
          placeholderTextColor={theme.text}
          style={{
            margin: 'auto',
            height: 54,
            width: '92.5%',
            fontSize: 22,
            padding: 10,
            color: theme.text,
            borderColor: borderColor,
            textAlignVertical: 'center',
            borderStyle: 'solid',
            borderRadius: 12,
            borderWidth: 2,
          }}
          value={searchText}
          onChangeText={setSearchText}
          className='z-5'
          onFocus={toggleSearch} // Show search when focused
          onBlur={() => {
            setIsSearchVisible(false); // Hide search when focus is lost
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
