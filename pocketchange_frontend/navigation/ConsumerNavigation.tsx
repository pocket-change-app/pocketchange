import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { colors } from '../constants/Colors';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { styles } from '../Styles';

import BusinessScreen from '../screens/BusinessScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PocketTabScreen from '../screens/PocketTabScreen';
import PayTabScreen from '../screens/PayTabScreen';
import WalletScreen from '../screens/WalletScreen';
import PocketScreen from '../screens/PocketScreen';
import ConsumerSettingsScreen from '../screens/ConsumerSettingsScreen';
import ConsumerTransactionScreen from '../screens/ConsumerTransactionScreen';
import PayAmountScreen from '../screens/PayAmountScreen';
import PayTipScreen from '../screens/PayTipScreen';
import PaySummaryScreen from '../screens/PaySummaryScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export const ConsumerNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // tabBarStyle: styles.tabBar,
        // tabBarActiveTintColor: colors.dark,
        // tabBarInactiveTintColor: colors.subtle,
        // tabBarShowLabel: false,
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerTintColor: colors.gold,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Root" component={BottomTabConsumer} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

    </Stack.Navigator>
  );
}

function PocketStack() {
  return (
    <Stack.Navigator
      initialRouteName='PocketSearch'
      screenOptions={{
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false,
        headerTintColor: colors.gold,
        // headerBackButtonMenuEnabled: true,
        // headerTitle: 'Pockets',
      }}
    >
      <Stack.Screen
        name="PocketSearch"
        component={PocketTabScreen}
        options={{ title: 'Pockets' }}
      />

      <Stack.Screen
        name="Pocket"
        component={PocketScreen}
        options={({ route }) => ({
          title: route.params.pocket.name
        })}
      />

      <Stack.Screen
        name="Business"
        component={BusinessScreen}
        options={({ route }) => ({
          title: route.params.business.name
        })}
      />
      <Stack.Screen
        name="PaymentModalStack"
        component={PaymentModalStack}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="BusinessStack"
        component={BusinessStack}
      /> */}
    </Stack.Navigator>
  )
}


function PayStack() {
  return (
    <Stack.Navigator
      initialRouteName='Pay'
      screenOptions={{
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false, // finding this was really annoying
        headerTintColor: colors.gold,
        // headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="Pay"
        component={PayTabScreen}
        options={{ title: ' Pay ' }}
      // screenOptions={{ headerShown: false }}
      />
      <Stack.Screen
        name="Business"
        component={BusinessScreen}
        options={({ route }) => ({
          title: route.params.business.name
        })}
      />
      <Stack.Screen
        name="PaymentModalStack"
        component={PaymentModalStack}
        options={({ navigation }: any) => ({
          presentation: 'modal',
          // headerStyle: styles.modalHeader,
          title: 'Payment',
          // headerShown: false,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name='close'
                size={25}
                color={colors.medium}
              // style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      {/* <Stack.Screen
        name="PayAmount"
        component={PayAmountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PayTip"
        component={PayTipScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaySummary"
        component={PaySummaryScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  )
}

function PaymentModalStack() {
  return (
    <Stack.Navigator
      initialRouteName='PayAmount'
      screenOptions={{
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false,
        headerTintColor: colors.gold,
        // headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="PayAmount"
        component={PayAmountScreen}
        options={{
          headerTitle: 'Payment',
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="PayTip"
        component={PayTipScreen}
        options={{
          headerTitle: 'Tip',
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaySummary"
        component={PaySummaryScreen}
        options={{
          headerTitle: 'Summary',
          // headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}


function WalletStack() {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false,
        headerTintColor: colors.gold,
      }}
    >
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ navigation }: RootTabScreenProps<'Wallet'>) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('ConsumerSettings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="gear"
                size={25}
                color={colors.medium}
              // style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="ConsumerSettings"
        component={ConsumerSettingsScreen}
        options={{
          title: 'Settings'
        }}
      />
      <Stack.Screen
        name="ConsumerTransaction"
        component={ConsumerTransactionScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabConsumer = () => {
  const colorScheme = 'light'; //useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='PayStack'
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.subtle,
        tabBarShowLabel: false,
        // headerTitleStyle: styles.navigationHeaderTitle,
        // headerStyle: styles.navigationHeader,
        // headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="PocketStack"
        component={PocketStack}
        options={{
          // title: 'Pockets',
          // headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="map-pin" color={color} />,
          // MAYBE WE CAN MAKE THE TOP RIGHT LITTLE BUTTON PULL UP A MAP MODAL
        }}
      />
      <BottomTab.Screen
        name="PayStack"
        component={PayStack}
        options={{
          // headerShown: false,
          // title: 'Pay',
          tabBarIcon: ({ color }) => <TabBarIcon name="credit-card-alt" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="WalletStack"
        component={WalletStack}
        options={({ navigation }: RootTabScreenProps<'WalletStack'>) => ({
          // title: 'Wallet',
          tabBarIcon: ({ color }) => <TabBarIcon name="id-card" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('ConsumerSettings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="gear"
                size={25}
                color={colors.medium}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
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
  return <FontAwesome size={30} {...props} />;
}