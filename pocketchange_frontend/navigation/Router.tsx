import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/Auth';

import { SplashScreen } from '../screens/SplashScreen';
import { AuthStack } from './AuthStack';
import { ConsumerStack } from './ConsumerStack';
import { MerchantStack } from './MerchantStack';


export const Router = () => {

    const {authData, loading, signedInAs} = useAuth();

    if (loading) {
        return <SplashScreen />;
    }

    console.log(signedInAs);
    var stack;
    if (authData) {
        if (signedInAs === "merchant") {
            stack = <MerchantStack />;
        } else if (signedInAs === "consumer") {
            stack = <ConsumerStack />;
        }
    } else {
        stack = <AuthStack />;
    }  

    return (
        <NavigationContainer>
            { stack }
        </NavigationContainer>
    );
};