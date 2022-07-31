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

import TransactionModalScreen from '../screens/TransactionModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PocketTabScreen from '../screens/PocketTabScreen';
import AnalyticsDashboardScreen from '../screens/AnalyticsDashboardScreen';
import TransactionsTabScreen from '../screens/TransactionsTabScreen';
import WalletScreen from '../screens/WalletScreen';
import PocketScreen from '../screens/PocketScreen';
import ConsumerSettingsScreen from '../screens/ConsumerSettingsScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export const MerchantStack = () => {
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
 
const BottomTabMerchant = () => {
    const colorScheme = 'light'; //useColorScheme();
 
    return (
        <BottomTab.Navigator
            initialRouteName='Analytics'
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
                name="Transactions"
                component={TransactionsTabScreen}
                options={({ navigation }: RootTabScreenProps<'Transactions'>) => ({
                title: 'Transactions',
                tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
                })}
            />
            <BottomTab.Screen
                name="Analytics"
                component={AnalyticsDashboardScreen}
                options={({ navigation }: RootTabScreenProps<'Analytics'>) => ({
                title: 'Analytics',
                tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
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