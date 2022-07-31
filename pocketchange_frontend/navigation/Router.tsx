import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/Auth';

import { SplashScreen } from '../screens/SplashScreen';
import { AuthStack } from './AuthStack';
import { ConsumerStack } from './ConsumerStack';
import { MerchantStack } from './MerchantStack';


export const Router = () => {

    const {authData, loading} = useAuth();

    if (loading) {
        console.log("LOADING");
        return <SplashScreen />;
    }

    console.log(authData);
    var stack;
    if (authData) {
        if (authData.type === "merchant") {
            stack = <MerchantStack />;
        } else if (authData.type === "consumer") {
            stack = <ConsumerStack />;
        }
    } else {
        console.log("AUTH")
        stack = <AuthStack />;
    }  

    return (
        <NavigationContainer>
            { stack }
        </NavigationContainer>
    );
};