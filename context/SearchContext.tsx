import { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
  isSearchVisible: boolean;
  setIsSearchVisible: (visible: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchText, setSearchText] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <SearchContext.Provider
      value={{ searchText, setSearchText, isSearchVisible, setIsSearchVisible }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
