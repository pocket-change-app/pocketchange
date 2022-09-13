import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/Colors';

import LandingScreen from '../screens/LandingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import { styles } from '../Styles';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='LandingScreen'
      screenOptions={{
        headerTintColor: colors.gold,
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false,
        // headerShown: false,
      }}
    >
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{
          headerShown: false,
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: 'Sign Up'
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: 'Sign In'
        }}
      />
    </Stack.Navigator>
  );
};