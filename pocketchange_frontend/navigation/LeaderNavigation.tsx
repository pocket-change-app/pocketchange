import * as React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../constants/Colors';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { styles } from '../Styles';

import NotFoundScreen from '../screens/shared/NotFoundScreen';
import LeaderMetricsScreen from '../screens/leader/LeaderMetricsScreen';
import ContestsTabScreen from '../screens/leader/ContestsTabScreen';
import PocketScreen from '../screens/consumer/PocketScreen';

import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import LeaderSettingsScreen from '../screens/leader/LeaderSettingsScreen';
import ContestScreen from '../screens/shared/ContestScreen';
import ContestWizardScreen from '../screens/leader/ContestWizardScreen';
import ContestWizardSummaryScreen from '../screens/leader/ContestWizardSummaryScreen';
import SettingsAboutScreen from '../screens/shared/SettingsAboutScreen';
import SurveyScreen from '../screens/shared/SurveyScreen';


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
      <Stack.Screen
        name="Root"
        component={BottomTabLeader}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />

      <Stack.Screen
        name="Survey"
        component={SurveyScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          // statusBarHidden: true,
          headerShown: false,
        }}
      />

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
        })}
      />
      <Stack.Screen
        name="Contest"
        component={ContestScreen}
        options={{}}
      />
      <Stack.Screen
        name="ContestWizard"
        component={ContestWizardScreen}
        options={{
          title: 'Contest Wizard'
        }}
      />
      <Stack.Screen
        name="ContestWizardSummary"
        component={ContestWizardSummaryScreen}
        options={{
          title: 'Summary'
        }}
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
        component={LeaderMetricsScreen}
        options={{
          title: 'Pocket Activity'
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
        options={{
          title: "Settings",
        }}
      />

      <Stack.Screen
        name="About"
        component={SettingsAboutScreen}
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
        name="MetricsStack"
        component={MetricsStack}
        options={({ navigation }: RootTabScreenProps<'Metrics'>) => ({
          title: 'Metrics',
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