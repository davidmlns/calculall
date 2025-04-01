import HeaderPages from './HeaderPages';
import { ScrollView } from 'react-native';

export default function About(): JSX.Element {
  return (
    <ScrollView className='bg-background-app w-full h-full' accessibilityLabel='Angles Screen'>
      <HeaderPages />
    </ScrollView>
  );
}
