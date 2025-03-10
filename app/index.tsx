import Categories from '../components/Categories';
import Header from '../components/Header';
import { ScrollView } from 'react-native';

export default function MiComponente() {
  return (
    <ScrollView className='bg-background-app'>
      <Header />
      <Categories />
    </ScrollView>
  );
}
