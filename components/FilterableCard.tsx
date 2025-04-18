import { ReactNode } from 'react';
import { useSearch } from '../context/SearchContext';
import Card from './Card';
import { IconType } from './Icons';

interface FilterableCardProps {
  id: string;
  title: string;
  icon: IconType;
  route: string;
  iconSize?: number;
  iconColor?: string;
  modalContent?: ReactNode;
}

export default function FilterableCard(props: FilterableCardProps) {
  const { searchText } = useSearch();
  // If there's no search text, show the card normally
  // If there is search text, only show the card if the title includes the search text (case insensitive)
  const shouldShow = !searchText || props.title.toLowerCase().includes(searchText.toLowerCase());
  if (!shouldShow) {
    return null;
  }
  return <Card {...props} />;
}
