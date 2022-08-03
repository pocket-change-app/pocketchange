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

import BusinessModalScreen from '../screens/BusinessModalScreen';
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

export const ConsumerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // tabBarStyle: styles.tabBar,
        // tabBarActiveTintColor: colors.dark,
        // tabBarInactiveTintColor: colors.subtle,
        // tabBarShowLabel: false,
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        //headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Root" component={BottomTabConsumer} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}
      >
        <Stack.Screen
          name="BusinessModal"
          component={BusinessModalScreen}
          options={{
          }}
        />
        <Stack.Screen
          name="ConsumerTransaction"
          component={ConsumerTransactionScreen}
          options={{
          }}
        />
        <Stack.Screen
          name="PayAmount"
          component={PayAmountScreen}
          options={{
          }}
        />
        <Stack.Screen
          name="PayTip"
          component={PayTipScreen}
          options={{
          }}
        />
        <Stack.Screen
          name="PaySummary"
          component={PaySummaryScreen}
          options={{
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="ConsumerSettings"
        component={ConsumerSettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="PocketScreen"
        component={PocketScreen}
      // options={{ title: '[pocket name here]' }}
      />
    </Stack.Navigator>
  );
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
      initialRouteName='Pay'
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.subtle,
        tabBarShowLabel: false,
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        //headerShadowVisible: false,
      }}
    >
      <BottomTab.Screen
        name="Pockets"
        component={PocketTabScreen}
        options={({ navigation }: RootTabScreenProps<'Pockets'>) => ({
          title: 'Pockets',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-pin" color={color} />,
          // MAYBE WE CAN MAKE THIS LITTLE BUTTON PULL UP A MAP MODAL
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('BusinessModal')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <FontAwesome
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="Pay"
        component={PayTabScreen}
        options={({ navigation }: RootTabScreenProps<'Pay'>) => ({
          title: 'Pay',
          tabBarIcon: ({ color }) => <TabBarIcon name="credit-card-alt" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ navigation }: RootTabScreenProps<'Wallet'>) => ({
          title: 'Wallet',
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