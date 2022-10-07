import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { AuthContext, RoleType } from '../contexts/Auth';

//import { useAuth } from '../contexts/Auth';
//import { useAuthentication } from '../hooks/useAuthentication';

import { SplashScreen } from '../screens/SplashScreen';
import { AuthStack } from './AuthStack';
import { ConsumerNavigation } from './ConsumerNavigation';
import { MerchantNavigation } from './MerchantNavigation';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Text, } from 'react-native';


import * as Linking from 'expo-linking';
import { LeaderNavigation } from './LeaderNavigation';
const prefix = Linking.createURL('/');


export const Router = () => {

  const authContext = useContext(AuthContext); 
  console.log("-------------AUTH CONTEXT -----------")
  console.log("firebase uid:", authContext.userFirebase.uid)
  console.log("GQL email:", authContext.userGQL.emailAddress)
  console.log("active role:", authContext.activeRole)
  console.log("-------------------------------------")

  if (authContext.loading) {
    return <SplashScreen />;
  }
  var stack;
  if (isNilOrEmpty(authContext.userGQL)) {
    stack = <AuthStack />;
  } else {
    if (authContext.activeRole.type === "MERCHANT") {
      stack = <MerchantNavigation />;
    } else if (authContext.activeRole.type === "CONSUMER") {
      stack = <ConsumerNavigation />;
    } else if (authContext.activeRole.type === "LEADER") {
      stack = <LeaderNavigation />;
    }
  }

  const linking = {
    prefixes: [prefix],//, "https://pocketchangeapp.ca"],
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {stack}
    </NavigationContainer>
  );
};