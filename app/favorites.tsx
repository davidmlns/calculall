import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import Card from '@/components/Card';

const Favorites = () => {
  const { favorites } = useFavorites();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <View className='flex-row flex-wrap items-center justify-center gap-6 mx-auto'>
        {favorites.map(fav => (
          <Card
            key={fav.id}
            id={fav.id}
            title={fav.title}
            category={fav.category}
            icon={fav.icon}
            route={fav.route}
            modalContent={fav.modalContent}
          />
        ))}
      </View>
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
});

export default Favorites;
