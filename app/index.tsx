import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SearchProvider } from '../context/SearchContext';
import { CalculateIcon, HomeIcon, StarIcon } from '@/components/Icons';
import CalculatorModal from '../components/CalculatorModal';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Favorites from './favorites';

const Tab = createBottomTabNavigator();

export default function MiComponente() {
  const [isCalcModalVisible, setIsCalcModalVisible] = useState(false);

  const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <ScrollView className='bg-background-app'>
          <Header />
          <Categories />
        </ScrollView>

        <TouchableOpacity style={styles.calcButton} onPress={() => setIsCalcModalVisible(true)}>
          <Text style={styles.calcButtonText}>
            <CalculateIcon size={42} color='#FFFFFF' />
          </Text>
        </TouchableOpacity>

        <CalculatorModal
          isVisible={isCalcModalVisible}
          onClose={() => setIsCalcModalVisible(false)}
        />
      </View>
    );
  };

  return (
    <SearchProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1A1A1A',
            borderTopColor: '#333333',
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
          component={HomeScreen}
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
    </SearchProvider>
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
