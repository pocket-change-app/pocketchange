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
import * as Location from 'expo-location';
import { LeaderNavigation } from './LeaderNavigation';
import wait, { waitTimes } from '../utils/wait';
const prefix = Linking.createURL('/');


export const Router = () => {

  const authContext = useContext(AuthContext);

  console.log("-------------AUTH CONTEXT -----------")
  console.log("firebase uid:", authContext.userFirebase.uid)
  console.log("GQL email:", authContext.userGQL.emailAddress)
  console.log("active role:", authContext.activeRole)
  console.log("-------------------------------------")

  // const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    const interval = setInterval(() => {
      // This will be called every 2 seconds

      (async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        // console.log('awaiting location...');
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        })
        // console.log('obtained location: \n')
        // setLocation(loc)
        console.log(loc);
      })();
    }, 2000);

    return () => clearInterval(interval);

  });


  // if (authContext.loading) {
  //   return <SplashScreen />;
  // }

  var stack;

  if (authContext?.loading || !authContext.userFirebase.uid) {
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


  const linking = {
    prefixes: [prefix],//, "https://pocketchangeapp.ca"],
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {stack}
    </NavigationContainer>
  );
};