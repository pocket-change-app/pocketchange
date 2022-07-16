/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors, { colors } from '../constants/Colors';
// import useColorScheme from '../hooks/useColorScheme';
import BusinessModalScreen from '../screens/BusinessModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PocketScreen from '../screens/PocketScreen';
import MerchantsScreen from '../screens/MerchantsScreen';
import WalletScreen from '../screens/WalletScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      {/* theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      {/* theme={DefaultTheme}> same nav container theme, regardless of dark/light mode.*/}
      <RootNavigator />
    </NavigationContainer >
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal',  headerTitleStyle: styles.headerTitleModal }}>
        <Stack.Screen 
          name="BusinessModal" 
          component={BusinessModalScreen} 
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = 'light' //useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Merchants"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.subtle,
        tabBarShowLabel: false,
        headerTitleStyle: styles.headerTitle
      }}>
      <BottomTab.Screen
        name="Pockets"
        component={PocketScreen}
        options={({ navigation }: RootTabScreenProps<'Pockets'>) => ({
          title: 'Pockets',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-pin" color={color} />,
          // MAYBE WE CAN MAKE THIS LITTLE BUTTON PULL UP A MAP MODAL
          headerRight: () => (
             <Pressable
               onPress={() => navigation.navigate('BusinessModal')}
               style={({ pressed }) => ({
                 opacity: pressed ? 0.5 : 1,
               })}>
               <FontAwesome
                 name="info-circle"
                 size={25}
                 color={Colors[colorScheme].text}
                 style={{ marginRight: 15 }}
               />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Merchants"
        component={MerchantsScreen}
        options={{
          title: 'Pay',
          tabBarIcon: ({ color }) => <TabBarIcon name="credit-card-alt" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <TabBarIcon name="id-card" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}



const styles = StyleSheet.create({
  tabBar: {
    height: 100,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'metropolis medium',
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: 'metropolis black italic',
    color: colors.subtle,
  },
  headerTitleModal: {
    fontSize: 20,
    fontFamily: 'metropolis medium',
    color: colors.subtle,
  }
})