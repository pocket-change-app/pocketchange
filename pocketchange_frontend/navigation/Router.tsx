import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, RoleType } from '../contexts/Auth';

//import { useAuth } from '../contexts/Auth';
//import { useAuthentication } from '../hooks/useAuthentication';

import { SplashScreen } from '../screens/shared/SplashScreen';
import { AuthStack } from './AuthStack';
import { ConsumerNavigation } from './ConsumerNavigation';
import { MerchantNavigation } from './MerchantNavigation';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Text, } from 'react-native';

import * as Linking from 'expo-linking';
import { LeaderNavigation } from './LeaderNavigation';
import wait, { waitTimes } from '../utils/wait';
import linking from './LinkingConfiguration';
const prefix = Linking.createURL('/');


export const Router = () => {

  const authContext = useContext(AuthContext);

  console.log("-------------AUTH CONTEXT -----------")
  // console.log("firebase uid:", authContext.userFirebase.uid)
  // console.log("GQL email:", authContext.userGQL.emailAddress)
  // console.log("active role:", authContext.activeRole)
  console.log(JSON.stringify(authContext, null, '  '))
  console.log("-------------------------------------")


  // const [currentPosition, setCurrentPosition] = useState(null);


  var stack;

  if (authContext.loading || !authContext.isLoggedIn) {
    stack = <AuthStack />;
  } else {

    if (authContext.activeRole.type === "MERCHANT") {      
      stack = <MerchantNavigation />;
    } else if (authContext.activeRole.type === "CONSUMER") {
      stack = <ConsumerNavigation />;
    } else if (authContext.activeRole.type === "LEADER") {
      stack = <LeaderNavigation />;
    }

    console.log('\n~ ACTIVATING ROLE ~\n');
    console.log(authContext.activeRole)
  } 


  // const linking = {
  //   prefixes: [
  //     Linking.createURL('/'),
  //     'https://www.pocketchangeapp.ca/',
  //   ],
  // };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {stack}
    </NavigationContainer>
  );
};