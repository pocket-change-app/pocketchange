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

import MerchantScreen from '../screens/MerchantScreen';
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
        headerTintColor: colors.dark,
        //headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Root" component={BottomTabConsumer} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Group screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}
      >
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
      /> */}
      {/* <Stack.Screen
        name="PocketScreen"
        component={PocketScreen}
        options={
          ({ route }) => ({ title: route.params.pocket.name, headerTitleStyle: styles.navigationHeaderPocketTitle })
        }
      />
      <Stack.Screen
        name="Merchant"
        component={MerchantScreen}
        options={
          { headerTitle: '' }
          //({ route }) => ({ title: route.params.business.name, headerTitleStyle: styles.navigationHeaderTitle })
        }
      /> */}
    </Stack.Navigator>
  );
}

function PocketStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PocketSearch"
        component={PocketTabScreen}
      />
      <Stack.Screen
        name="MerchantStack"
        component={MerchantScreen}
      />
    </Stack.Navigator>
  )
}

function PayStack() {
  return (
    <Stack.Navigator
      initialRouteName='Pay'>
      <Stack.Screen
        name="Pay"
        component={PayTabScreen}
      // screenOptions={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="MerchantStack"
        component={MerchantStack}
        options={{} }
      /> */}
      <Stack.Screen
        name="Merchant"
        component={MerchantScreen}
        options={
          // { headerTitle: '' }
          ({ route }) => ({ title: route.params.business.name, headerTitleStyle: styles.navigationHeaderTitle })
        }
      />
      <Stack.Screen
        name="PayAmount"
        component={PayAmountScreen}
        options={{}}
      />
      <Stack.Screen
        name="PayTip"
        component={PayTipScreen}
        options={{}}
      />
      <Stack.Screen
        name="PaySummary"
        component={PaySummaryScreen}
        options={{}}
      />
    </Stack.Navigator>
  )
}

function MerchantStack() {
  return (
    <Stack.Navigator
      initialRouteName="Merchant"
    >
      <Stack.Screen
        name="Merchant"
        component={MerchantScreen}
      />
    </Stack.Navigator>
  )
}

function WalletStack() {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
    >
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
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
      initialRouteName='PayTab'
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.subtle,
        tabBarShowLabel: false,
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false,
        headerShown: false
      }}
    >
      <BottomTab.Screen
        name="PocketTab"
        component={PocketStack}
        options={({ navigation }: RootTabScreenProps<'Pockets'>) => ({
          // title: 'Pockets',
          // headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="map-pin" color={color} />,
          // MAYBE WE CAN MAKE THIS LITTLE BUTTON PULL UP A MAP MODAL
        })}
      />
      <BottomTab.Screen
        name="PayTab"
        component={PayStack}
        options={({ navigation }: RootTabScreenProps<'Pay'>) => ({
          // headerShown: false,
          // title: 'Pay',
          tabBarIcon: ({ color }) => <TabBarIcon name="credit-card-alt" color={color} />,
        })}
      />

      <BottomTab.Screen
        name="WalletTab"
        component={WalletStack}
        options={({ navigation }: RootTabScreenProps<'Wallet'>) => ({
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