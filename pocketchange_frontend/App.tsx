import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Router } from './navigation/Router';
import { SplashScreen } from './screens/SplashScreen';

import { user } from './dummy';
import { AuthProvider } from './contexts/Auth';
import { colors } from './constants/Colors';
import useCachedResources from './hooks/useCachedResources';


export default function App() {
  
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <Router />
      </AuthProvider>
    );
  }
}
