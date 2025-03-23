import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Favorites = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {/* Aquí puedes agregar la lógica para mostrar los elementos favoritos */}
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
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Favorites;
