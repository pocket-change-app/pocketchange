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
  // console.log("firebase uid:", authContext.userFirebase.uid)
  // console.log("GQL email:", authContext.userGQL.emailAddress)
  // console.log("active role:", authContext.activeRole)
  console.log(JSON.stringify(authContext, null, '  '))
  console.log("-------------------------------------")


  const [errorMsg, setErrorMsg] = useState(null);

  const [watcher, setWatcher] = useState(undefined);
  // const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        Location.watchPositionAsync({
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 10,
          // timeInterval: 10000
        }, (pos) => {
          console.log('position: ', pos)
          // setCurrentPosition(pos);
        }).then((locationWatcher) => {
          setWatcher(locationWatcher);
        }).catch((err) => {
          console.log(err)
        })
      })()
    } else {
      console.log('removing watcher!');
      watcher?.remove()
    }
  }, [authContext.isLoggedIn])


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


  const linking = {
    prefixes: [prefix],//, "https://pocketchangeapp.ca"],
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {stack}
    </NavigationContainer>
  );
};