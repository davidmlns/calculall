import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import Card from '@/components/Card';
import { DeleteIcon } from '@/components/Icons';

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <View className='flex-row flex-wrap items-center justify-center gap-6 mx-auto'>
        {favorites.map((fav, index) => (
          <Card
            key={fav.id || index}
            id={fav.id}
            title={fav.title}
            category={fav.category}
            icon={fav.icon}
            route={fav.route}
            modalContent={fav.modalContent}
          />
        ))}
      </View>

      {favorites.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearFavorites}>
          <DeleteIcon size={42} color='#FFFFFF' />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  clearButton: {
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
});

export default Favorites;
