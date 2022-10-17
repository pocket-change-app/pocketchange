import * as React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../constants/Colors';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { styles } from '../Styles';

import TransactionModalScreen from '../screens/TransactionModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import AnalyticsDashboardScreen from '../screens/AnalyticsDashboardScreen';
import ContestsTabScreen from '../screens/ContestsTabScreen';
import PocketScreen from '../screens/PocketScreen';
import MerchantSettingsScreen from '../screens/MerchantSettingsScreen';

import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import SettingsTippingScreen from '../screens/SettingsTippingScreen';
import EditEmployeesScreen from '../screens/EditEmployeesScreen';
import LeaderSettingsScreen from '../screens/LeaderSettingsScreen';
import ContestScreen from '../screens/ContestScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export const LeaderNavigation = () => {

  const authContext = useContext(AuthContext);

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
      <Stack.Screen name="Root" component={BottomTabLeader} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{
        presentation: 'modal',
      }}
      >
        <Stack.Screen
          name="TransactionModal"
          component={TransactionModalScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{
        presentation: 'modal',
      }}
      >

      </Stack.Group>
    </Stack.Navigator>
  );
}

function ContestsStack() {
  return (
    <Stack.Navigator
      initialRouteName='Contests'
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
        name="Contests"
        component={ContestsTabScreen}
        options={({ navigation }: RootTabScreenProps<'Contests'>) => ({
          title: 'Contests',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
        })}
      />
      <Stack.Screen
        name="Contest"
        component={ContestScreen}
        options={{}}
      />

      {/* <Stack.Screen
        name="TransactionModal"
        component={TransactionModalScreen}
        options={{
          presentation: 'modal',
        }}
      /> */}
    </Stack.Navigator>
  )
}


function AnalyticsStack() {
  return (
    <Stack.Navigator
      initialRouteName='MerchantAnalytics'
      screenOptions={{
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false, // finding this was really annoying
        headerTintColor: colors.gold,
        // headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="MerchantAnalytics"
        component={AnalyticsDashboardScreen}
        options={{
          title: 'Pocket Analytics'
        }}
      // screenOptions={{ headerShown: false }}
      />

    </Stack.Navigator>
  )
}


function LeaderSettingsStack() {

  //const auth = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="LeaderSettings"
      screenOptions={{
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false,
        headerTintColor: colors.gold,
      }}
    >
      <Stack.Screen
        name="LeaderSettings"
        component={LeaderSettingsScreen}
        options={({ navigation }: RootTabScreenProps<'LeaderSettingsStack'>) => ({
          title: "Settings",
        })}
      />

      <Stack.Screen
        name="Pocket"
        component={PocketScreen}
        options={{ title: '' }}
      />

      {/* <Stack.Screen
        name="EditEmployees"
        component={EditEmployeesScreen}
        options={{
          title: "Employees",
        }}
      /> */}

    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabLeader = () => {
  const colorScheme = 'light'; //useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='TransactionsStack'
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
        name="AnalyticsStack"
        component={AnalyticsStack}
        options={({ navigation }: RootTabScreenProps<'Analytics'>) => ({
          title: 'Analytics',
          tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
        })}
      />

      <BottomTab.Screen
        name="ContestsStack"
        component={ContestsStack}
        options={({ navigation }: RootTabScreenProps<'Contests'>) => ({
          title: 'Contests',
          tabBarIcon: ({ color }) => <TabBarIcon name='trophy' color={color} />,
        })}
      />

      <BottomTab.Screen
        name="LeaderSettingsStack"
        component={LeaderSettingsStack}
        options={({ navigation }: RootTabScreenProps<'LeaderSettings'>) => ({
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
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