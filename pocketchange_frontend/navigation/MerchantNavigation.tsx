import * as React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../constants/Colors';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { styles } from '../Styles';

import NotFoundScreen from '../screens/shared/NotFoundScreen';
import MerchantMetricsScreen from '../screens/merchant/MerchantMetricsScreen';
import TransactionsTabScreen from '../screens/merchant/TransactionsTabScreen';
import PocketScreen from '../screens/consumer/PocketScreen';
import MerchantSettingsScreen from '../screens/merchant/MerchantSettingsScreen';

import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import SettingsTippingScreen from '../screens/merchant/SettingsTippingScreen';
import EditEmployeesScreen from '../screens/merchant/EditEmployeesScreen';
import SurveyScreen from '../screens/shared/SurveyScreen';
import TransactionScreen from '../screens/merchant/TransactionScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export const MerchantNavigation = () => {

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
      <Stack.Screen name="Root" component={BottomTabMerchant} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{
        presentation: 'modal',
      }}
      >
      </Stack.Group>
      <Stack.Group
        screenOptions={{
        presentation: 'modal',
      }}
      >
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            // statusBarHidden: true,
            headerShown: false,
            autoHideHomeIndicator: true,
          }}
        />
      </Stack.Group>

      <Stack.Screen
        name="PocketScreen"
        component={PocketScreen}
      // options={{ title: '[pocket name here]' }}
      />
    </Stack.Navigator>
  );
}

function TransactionsStack() {
  return (
    <Stack.Navigator
      initialRouteName='Transactions'
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
        name="Transactions"
        component={TransactionsTabScreen}
        options={{
          title: 'Transactions'
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  )
}


function MetricsStack() {
  return (
    <Stack.Navigator
      initialRouteName='MerchantMetrics'
      screenOptions={{
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false, // finding this was really annoying
        headerTintColor: colors.gold,
        // headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="MerchantMetrics"
        component={MerchantMetricsScreen}
        options={{
          title: 'Business Activity'
        }}
      // screenOptions={{ headerShown: false }}
      />

    </Stack.Navigator>
  )
}


function SettingsStack() {

  //const auth = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="MerchantSettings"
      screenOptions={{
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false,
        headerTintColor: colors.gold,
      }}
    >
      <Stack.Screen
        name="MerchantSettings"
        component={MerchantSettingsScreen}
        options={({ navigation }: RootTabScreenProps<'MerchantSettings'>) => ({
          title: "Settings",
        })}
      />

      <Stack.Screen
        name="EditEmployees"
        component={EditEmployeesScreen}
        options={{
          title: "Employees",
        }}
      />

      <Stack.Screen
        name="SettingsTipping"
        component={SettingsTippingScreen}
        options={{
          title: "Tipping",
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

const BottomTabMerchant = () => {
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
        name="MetricsStack"
        component={MetricsStack}
        options={({ navigation }: RootTabScreenProps<'Metrics'>) => ({
          title: 'Business Metrics',
          tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
        })}
      />

      <BottomTab.Screen
        name="TransactionsStack"
        component={TransactionsStack}
        options={({ navigation }: RootTabScreenProps<'Transactions'>) => ({
          title: 'Transactions',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
        })}
      />

      <BottomTab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({ navigation }: RootTabScreenProps<'MerchantSettings'>) => ({
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