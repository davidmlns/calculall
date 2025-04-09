import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SearchProvider } from '../context/SearchContext';
import { CalculateIcon, HomeIcon, StarIcon } from '@/components/Icons';
import CalculatorModal from '../components/CalculatorModal';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Favorites from './favorites';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/context/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageProvider } from '../context/LanguageContext';
const Tab = createBottomTabNavigator();
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function MiComponente() {
  const [isCalcModalVisible, setIsCalcModalVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Satoshi: require('../assets/fonts/Satoshi-Variable.ttf'),
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('@language');
        if (savedLang) {
          i18n.changeLanguage(savedLang);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    loadSavedLanguage();
  }, []);

  if (!fontsLoaded) return null;

  const HomeScreen = () => {
    const { theme } = useTheme();
    return (
      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: theme.background }}>
          <Header />
          <Categories />
        </ScrollView>

        <TouchableOpacity
          className='absolute bottom-6 right-6 bg-orange-500 p-2 rounded-full shadow-lg'
          onPress={() => setIsCalcModalVisible(true)}>
          <CalculateIcon color='white' size={42} />
        </TouchableOpacity>

        <CalculatorModal
          isVisible={isCalcModalVisible}
          onClose={() => setIsCalcModalVisible(false)}
        />
        <Toast />
      </View>
    );
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider>
          <SearchProvider>
            <FavoritesProvider>
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarStyle: {
                    backgroundColor: '#1A1A1A',
                    borderTopColor: '#333333',
                    borderTopWidth: 2,
                    height: 60,
                  },
                  tabBarLabelStyle: {
                    fontSize: 16.5,
                    fontWeight: 'bold',
                  },
                  tabBarActiveTintColor: '#FF9427',
                  tabBarInactiveTintColor: '#999999',
                }}>
                <Tab.Screen
                  name='Home'
                  children={() => (
                    <HomeScreen
                      isCalcModalVisible={isCalcModalVisible}
                      setIsCalcModalVisible={setIsCalcModalVisible}
                    />
                  )}
                  options={{
                    tabBarIcon: ({ color }) => <HomeIcon size={32} color={color} />,
                  }}
                />
                <Tab.Screen
                  name='Favorites'
                  component={Favorites}
                  options={{
                    tabBarIcon: ({ color }) => <StarIcon size={32} color={color} />,
                  }}
                />
              </Tab.Navigator>
            </FavoritesProvider>
          </SearchProvider>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calcButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF9427',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  calcButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
