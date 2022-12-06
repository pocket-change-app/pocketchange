import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { AuthData, authService } from '../services/authService';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
//import { useUserQuery } from '../hooks-apollo/index'
import UserQueries from '../hooks-apollo/User/queries';
import * as Location from 'expo-location';


import { isNilOrEmpty, isNotNilOrEmpty } from 'ramda-adjunct';
import { useLazyQuery } from '@apollo/client';
import { LocationObject, LocationSubscription } from 'expo-location';
import { stringify } from '@firebase/util';


export enum RoleType {
  Consumer = 'CONSUMER',
  Merchant = 'MERCHANT',
  Leader = 'LEADER',
}

export enum RoleLevel {
  Owner = 'OWNER',
  Manager = 'MANAGER',
  Employee = 'EMPLOYEE',
}

export type Role = {
  type: RoleType, // 'consumer', 'merchant', or 'leader'
  level?: RoleLevel, // permission level if 'merchant' or 'leader'
  entityID?: String, // if 'merchant' then the businessID, if 'leader' then the pocketID, else null
  entityName?: String, // name corresponding to above ID.
};

export type AuthContextData = {
  userFirebase: User,
  userGQL: Object,
  setUserGQL: (user) => void,
  activeRole: Role,
  switchActiveRole: (role: Role) => void,
  signOut(): void,
  loading: boolean,
  setLoading: (loading) => void,
  isLoggedIn: boolean,
  locationWatcher: LocationSubscription,
  location: LocationObject,
};

//Create the Auth Context with the data type specified
//and a empty object
export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: any }) => {

  // console.log('AuthProvider has been called.');
  const [errorMsg, setErrorMsg] = useState(null)

  const [userFirebase, setUserFirebase] = useState<User>({} as User);
  const [userGQL, setUserGQL] = useState({});
  const [activeRole, setActiveRole] = useState<Role>({} as Role);
  const [loading, setLoading] = useState(true);
  // location hooks
  const [locationWatcher, setLocationWatcher] = useState<LocationSubscription>();
  const location = useRef<LocationObject>()

  const isLoggedIn = (
    isNotNilOrEmpty(userFirebase.uid) &&
    isNotNilOrEmpty(userGQL.emailAddress)
  )
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // lazy query definition: GQL users for firebase uid 
  const [loadUserGQL, { called, data, error }] = useLazyQuery(
    UserQueries.user,
    {
      onCompleted(data) { setUserGQL(data.user) },
      onError(error) { 
        console.log("ERROR: loadUserGQL ");  
        console.log(error)
      }
    });

  // every time the App is opened, this runs
  useEffect(() => {
    // AsyncStorage.clear();
    //and call de loadStorage function.
    loadStorageData();
  }, []);

  // LOCATION EFFECT
  // run when logging in/out to subscribe/unsubscribe to location data
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        Location.watchPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10,
          // timeInterval: 10000
        }, (loc) => {
          // console.log('\nauthContext.location:\n', JSON.stringify(loc, null, '  '))
          location.current = loc
        }).then((watcher) => {
          setLocationWatcher(watcher);
        }).catch((err) => {
          console.log(err)
        })
      })()
    } else {
      console.log('removing watcher!');
      locationWatcher?.remove()
    }
  }, [isLoggedIn])

  // run on when userFirebase changes
  useEffect(() => {
    if (!(isNilOrEmpty(userFirebase))) {
      loadUserGQL({ variables: { userID: userFirebase.uid } })
    } else {
      setActiveRole({ type: RoleType.Consumer });// change this to use saved state or check roles via a resolver
    }
  }, [userFirebase]) // <-- here put the parameter to listen 

  // when activeRole changes, write it to local storage
  useEffect(() => {
    AsyncStorage.setItem('@ActiveRole', JSON.stringify(activeRole));
  }, [activeRole]);

  // called when firebase auth state changes
  const handleAuthStateChanged = ((userFirebase: User) => {
    if (!(isNilOrEmpty(userFirebase))) {
      setUserFirebase(userFirebase);
    } else {
      setUserFirebase({} as User);
      setUserGQL({});
    }
    if (loading) setLoading(false);
  });

  const switchActiveRole = ((role: Role) => {
    // TODO: check here if signed in user has permission to switch to role
    setActiveRole(role);
    // console.log("SWITCHED ROLE TO: ", role)
  });

  const signOut = (() => {
    const auth = getAuth();
    auth.signOut();
  });

  useEffect(() => {
    const auth = getAuth()
    const subscriber = auth.onAuthStateChanged(handleAuthStateChanged);
    return subscriber;
  }, []);

  async function loadStorageData(): Promise<void> {
        try {
          const activeRoleSerialized = await AsyncStorage.getItem('@ActiveRole');
          if (activeRoleSerialized) {
            const _activeRole: string = JSON.parse(activeRoleSerialized);
            console.log("LOADING FROM STORE")
            console.log(_activeRole)
            console.log("____________")
            switchActiveRole(_activeRole as Role);
          }
        } catch (error) {
          console.log("ERROR: loading active role from async storage. ", error)
        } finally {
          //loading finished
          setLoading(false);
        }
  }

  const authContextData = {
    userFirebase: userFirebase,
    userGQL: userGQL,
    setUserGQL: setUserGQL,
    activeRole: activeRole,
    switchActiveRole: switchActiveRole,
    signOut: signOut,
    loading: loading,
    setLoading: setLoading,
    isLoggedIn: isLoggedIn,
    location: location,

  }

  if (loading) return null;

  return (
    <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>
  );
};




// const AuthProvider: React.FC = ({ children }) => {
//   const [authData, setAuthData] = useState<User>();

//   //the AuthContext start with loading equals true
//   //and stay like this, until the data be load from Async Storage
//   const [loading, setLoading] = useState(true);

//   const [signedInAs, setSignedInAs] = useState("consumer");

//   useEffect(() => {
//     AsyncStorage.clear();
//     //Every time the App is opened, this provider is rendered
//     //and call de loadStorage function.
//     loadStorageData();
//   }, []);

//   async function loadStorageData(): Promise<void> {
//     try {
//       //Try get the data from Async Storage
//       const authDataSerialized = await AsyncStorage.getItem('@AuthData');
//       if (authDataSerialized) {
//         //If there are data, it's converted to an Object and the state is updated.
//         const _authData: AuthData = JSON.parse(authDataSerialized);
//         setAuthData(_authData);

//       }
//       const signedInAsSerialized = await AsyncStorage.getItem('@SignedInAs');
//       if (signedInAsSerialized) {
//         const _signedInAs: string = JSON.parse(signedInAsSerialized);
//         console.log("LOADING FROM STORE")
//         console.log(_signedInAs)
//         console.log("____________")

//         setSignedInAs(_signedInAs);
//       }
//     } catch (error) {
//     } finally {
//       //loading finished
//       setLoading(false);
//     }
//   }


//   const signIn = async () => {
//     //call the service passing credential (email and password).
//     //In a real App this data will be provided by the user from some InputText components.
//     const _authData = await authService.signIn(
//       'lucasgarcez@email.com',
//       '123456',
//     );

//     //Set the data in the context, so the App can be notified
//     //and send the user to the AuthStack
//     setAuthData(_authData);

//     // TODO: change this to remember which was signed in
//     setSignedInAs('merchant');

//     //Persist the data in the Async Storage
//     //to be recovered in the next user session.
//     AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
//     AsyncStorage.setItem('@SignedInAs', JSON.stringify(signedInAs));
//   };

//   const signOut = async () => {
//     //Remove data from context, so the App can be notified
//     //and send the user to the AuthStack
//     setAuthData(undefined);

//     //Remove the data from Async Storage
//     //to NOT be recoverede in next session.
//     await AsyncStorage.removeItem('@AuthData');
//   };

//   const switchAccount = async () => {
//     if (authData.type === "merchant") {
//       if (signedInAs === "merchant") {
//         setSignedInAs("consumer");
//       } else {
//         setSignedInAs("merchant");
//       }
//     }
//   }

//   return (
//     //This component will be used to encapsulate the whole App,
//     //so all components will have access to the Context
//     <AuthContext.Provider value={{ authData, signedInAs, loading, signIn, signOut, switchAccount }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// //A simple hooks to facilitate the access to the AuthContext
// // and permit components to subscribe to AuthContext updates
// function useAuth(): AuthContextData {

//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context;
// }

// export { AuthContext, AuthProvider, useAuth };