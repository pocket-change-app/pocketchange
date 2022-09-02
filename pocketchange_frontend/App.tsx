import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { Router } from './navigation/Router';
import { SplashScreen } from './screens/SplashScreen';

import { user } from './dummy';
import { AuthProvider } from './contexts/Auth';
import { ApolloProvider } from '@apollo/client';
import {ApolloProvider as ApolloHooksProvider} from "@apollo/react-hooks"
import { colors } from './constants/Colors';
import useCachedResources from './hooks/useCachedResources';
import { Text, TextInput } from 'react-native';
import {apolloClient} from './apollo'


export default function App() {

  const isLoadingComplete = useCachedResources();

  Text.defaultProps = Text.defaultProps || {}
  TextInput.defaultProps = TextInput.defaultProps || {}
  // Ignore dynamic type scaling on iOS
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.allowFontScaling = false;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
      <AuthProvider>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
        <Router />
      </AuthProvider>
      </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}
