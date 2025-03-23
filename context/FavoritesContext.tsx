// contexts/FavoritesContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface FavoriteItem {
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
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const isFavorite = (item: FavoriteItem) => {
    return favorites.some(fav => fav.title === item.title && fav.category === item.category);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev =>
      isFavorite(item)
        ? prev.filter(fav => fav.title !== item.title || fav.category !== item.category)
        : [...prev, item],
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
