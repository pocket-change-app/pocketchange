import { StatusBar } from 'expo-status-bar';
import { Router } from './navigation/Router';
import { AuthContext, AuthProvider } from './contexts/Auth';
import { ApolloProvider, createHttpLink } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks"
import useCachedResources from './hooks/useCachedResources';
import { Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { apolloClient } from './apollo'
import './config/firebase';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useContext } from 'react';
import apolloClient from './apollo'
import { useState } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
 import { setContext } from '@apollo/client/link/context';
 import Constants from 'expo-constants';

export default function App() {

  const [IDToken, setIDToken] = useState('')
  
  function createApolloClient() {
  
    const GRAPHQL_API_URL = Constants.manifest?.extra?.graphQLURL;
  
    const httpLink = createHttpLink({
      uri: GRAPHQL_API_URL,
      options: {
        reconnect: true,
      },
    });
  
    const authLink = setContext(async (_, { headers }) => {
        async function loadStorageData() {
          try {
            const IDTokenSerialized = await AsyncStorage.getItem('@IDToken');
            if (IDTokenSerialized) {
              const _IDToken = JSON.parse(IDTokenSerialized);
              console.log("LOADING TOKEN FROM STORE")
              console.log(_IDToken)
              console.log("____________")
              setIDToken(_IDToken);
            }
          } catch (error) {
            console.log("ERROR: loading token from async storage. ", error)
          } 
      }
      await loadStorageData()
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          "X-Auth-Token": IDToken,
        },
      };
    });
  
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
  }

  const apolloClient = createApolloClient()

  
  const isLoadingComplete = useCachedResources();

  Text.defaultProps = Text.defaultProps || {}
  TextInput.defaultProps = TextInput.defaultProps || {}
  // Ignore dynamic type scaling on iOS
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.allowFontScaling = false;

  if (!isLoadingComplete) return (null)
  return (
    <StripeProvider
      publishableKey="pk_test_51LQ93XBeLUBca0ydGD2tHAmS7e2EWvqbC6EnYmNgqw73gsgq482BaxFtT3UGFPqukm7y7jHXWE3txJai783GvB0600QsTTkVkH" //TODO: change to non-test mode
      urlScheme="your-url-scheme" // TODO: required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // TODO: required for Apple Pay
    >
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
          <AuthProvider>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
            <Router />
          </AuthProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </StripeProvider>
  );
}