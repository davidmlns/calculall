import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type IconType = {
  library: 'MaterialIcons' | 'MaterialCommunityIcons';
  name: string;
  size: number;
  color: string;
};

interface FavoriteItem {
  id: string;
  title: string;
  category: string;
  icon: IconType;
  route: string;
  iconSize?: number;
  iconColor?: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (item: Omit<FavoriteItem, 'icon'> & { icon: IconType }) => void;
  isFavorite: (item: FavoriteItem) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
});
export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  // Guardar favoritos cuando cambian
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    };
    saveFavorites();
  }, [favorites]);

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (item: FavoriteItem) => {
    return favorites.some(fav => fav.title === item.title && fav.category === item.category);
  };

  const toggleFavorite = (
    item: Omit<FavoriteItem, 'icon'> & { icon: IconType; iconSize: number; iconColor: string },
  ) => {
    const serializableItem = {
      ...item,
      icon: item.icon,
      route: item.route,
      id: item.id,
      title: item.title,
      category: item.category,
      iconSize: item.iconSize,
      iconColor: item.iconColor,
    };

    if (favorites.length >= 6 && !isFavorite(serializableItem)) {
      Toast.show({
        type: 'error',
        text1: 'Limit reached',
        text2: 'You cannot add more than 6 favorites',
        position: 'bottom',
        text1Style: {
          fontSize: 17,
          fontWeight: 'bold',
        },
        text2Style: {
          fontSize: 15,
        },
      });
      return;
    }

    setFavorites(prev =>
      isFavorite(serializableItem)
        ? prev.filter(fav => fav.title !== item.title || fav.category !== item.category)
        : [...prev, serializableItem],
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavorites = () => useContext(FavoritesContext);
