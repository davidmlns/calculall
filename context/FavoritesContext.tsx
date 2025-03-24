// contexts/FavoritesContext.tsx
import React, { createContext, useContext, useState } from 'react';
import Toast from 'react-native-toast-message';

interface FavoriteItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  route: string;
  modalContent?: React.ReactNode;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (item: FavoriteItem) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (item: FavoriteItem) => {
    return favorites.some(fav => fav.title === item.title && fav.category === item.category);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (favorites.length >= 6 && !isFavorite(item)) {
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
      isFavorite(item)
        ? prev.filter(fav => fav.title !== item.title || fav.category !== item.category)
        : [...prev, item],
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
