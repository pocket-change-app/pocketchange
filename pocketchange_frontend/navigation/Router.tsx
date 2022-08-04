import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/Auth';

import { SplashScreen } from '../screens/SplashScreen';
import { AuthStack } from './AuthStack';
import { ConsumerNavigation } from './ConsumerNavigation';
import { MerchantNavigation } from './MerchantNavigation';


export const Router = () => {

  const { authData, loading, signedInAs } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  console.log(signedInAs);
  var stack;
  if (authData) {
    if (signedInAs === "merchant") {
      stack = <MerchantNavigation />;
    } else if (signedInAs === "consumer") {
      stack = <ConsumerNavigation />;
    }
  } else {
    stack = <AuthStack />;
  }

  return (
    <NavigationContainer>
      {stack}
    </NavigationContainer>
  );
};