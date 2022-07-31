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
import PocketTabScreen from '../screens/PocketTabScreen';
import PayTabScreen from '../screens/PayTabScreen';
import WalletScreen from '../screens/WalletScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { BORDER_WIDTH } from '../Styles';
import PocketScreen from '../screens/PocketScreen';
import ConsumerSettingsScreen from '../screens/ConsumerSettingsScreen';

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
    <Stack.Navigator
      screenOptions={{
        // tabBarStyle: styles.tabBar,
        // tabBarActiveTintColor: colors.dark,
        // tabBarInactiveTintColor: colors.subtle,
        // tabBarShowLabel: false,
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        //headerShadowVisible: false,
      }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{
        presentation: 'modal',
      }}
      >
        <Stack.Screen
          name="BusinessModal"
          component={BusinessModalScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{
        presentation: 'modal',
      }}
      >
        <Stack.Screen
          name="ConsumerSettings"
          component={ConsumerSettingsScreen}
          options={{
            title: 'Settings',
            // headerShown: true,
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

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = 'light' //useColorScheme();

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
      }}>
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
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}



const styles = StyleSheet.create({
  navigationHeader: {
    height: 100,
    backgroundColor: colors.bg,
    // borderBottomWidth: 2,
    borderWidth: 0
  },
  navigationHeaderTitle: {
    fontSize: 30,
    fontFamily: 'metropolis black italic',
    color: colors.subtle,
  },
  tabBar: {
    height: 100,
    backgroundColor: colors.bg,
    // borderTopWidth: BORDER_WIDTH,
    borderWidth: 0,
    borderColor: colors.light,
  },
  // tabLabel: {
  //   fontSize: 12,
  //   fontFamily: 'metropolis medium',
  // },
  // headerTitleModal: {
  //   fontSize: 20,
  //   fontFamily: 'metropolis medium',
  //   color: colors.subtle,
  // }
})