import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchProvider } from '../context/SearchContext';

export default function Layout() {
  return (
    <>
      <SearchProvider>
        <SafeAreaProvider>
          <View style={styles.container}>
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: '#1A1A1A' },
                headerTitle: '',
                headerShown: false,
              }}
            />
          </View>
        </SafeAreaProvider>
      </SearchProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});
