import * as React from 'react';
import * as Location from 'expo-location'
import { Pressable, StyleSheet, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { colors } from '../constants/Colors';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { styles } from '../Styles';

import BusinessScreen from '../screens/shared/BusinessScreen';
import QRScanScreen from '../screens/consumer/QRScanScreen';
import NotFoundScreen from '../screens/shared/NotFoundScreen';
import PocketTabScreen from '../screens/consumer/PocketTabScreen';
import PayTabScreen from '../screens/consumer/PayTabScreen';
import WalletScreen from '../screens/consumer/WalletScreen';
import PocketScreen from '../screens/consumer/PocketScreen';
import ConsumerSettingsScreen from '../screens/consumer/ConsumerSettingsScreen';
import ReceiptScreen from '../screens/shared/ReceiptScreen';
import PayAmountScreen from '../screens/consumer/PayAmountScreen';
import PayTipScreen from '../screens/consumer/PayTipScreen';
import PaySummaryScreen from '../screens/consumer/PaySummaryScreen';
import PayConfirmationScreen from '../screens/consumer/PayConfirmationScreen';
import EditProfileScreen from '../screens/consumer/EditProfileScreen';
import SettingsAboutScreen from '../screens/shared/SettingsAboutScreen';
import BusinessWizardProfileScreen from '../screens/consumer/BusinessWizardProfileScreen';
import BusinessWizardUploadImage from '../screens/consumer/BusinessWizardUploadImage';
import BusinessWizardStripeScreen from '../screens/consumer/BusinessWizardStripeScreen';
import ContestScreen from '../screens/shared/ContestScreen';

import ScanConfirmationScreen from '../screens/consumer/ScanConfirmationScreen';
import SurveyScreen from '../screens/shared/SurveyScreen';
import MapScreen from '../screens/consumer/MapScreen';


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
        headerBackTitleStyle: styles.navigationBackTitleStyle,
        headerTintColor: colors.gold,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Root" component={BottomTabConsumer} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="PaymentModalStack"
        component={PaymentModalStack}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      {/* <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      > */}
      <Stack.Screen
        name="PayConfirmation"
        component={PayConfirmationScreen}
        options={{
          presentation: 'fullScreenModal',
          animation: 'fade',
          // statusBarHidden: true,
          headerShown: false,
          autoHideHomeIndicator: true,
        }}
      />

      <Stack.Screen
        name="ScanConfirmation"
        component={ScanConfirmationScreen}
        options={{
          presentation: 'fullScreenModal',
          animation: 'fade',
          // statusBarHidden: true,
          headerShown: false,
          autoHideHomeIndicator: true,
        }}
      />

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



      {/* </Stack.Group> */}


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
        headerBackTitleStyle: styles.navigationBackTitleStyle,
        // headerTitle: 'Pockets',
      }}
    >
      <Stack.Screen
        name="PocketSearch"
        component={PocketTabScreen}
        options={{
          title: 'Pockets',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Pocket"
        component={PocketScreen}
        options={({ route }) => ({
          title: ''//route.params.pocket.name,
          //headerTitleStyle: styles.navigationHeaderPocketTitle
        })}
      />

      <Stack.Screen
        name="Business"
        component={BusinessScreen}
        options={({ route }) => ({
          title: '', //route.params.business.name
        })}
      />
      {/* <Stack.Screen
        name="PaymentModalStack"
        component={PaymentModalStack}
        options={{
          // presentation: 'modal',
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Contest"
        component={ContestScreen}
        options={{
          // presentation: 'modal',
          // headerShown: false,
          // title: '',
        }}
      />
      {/* <Stack.Screen
        name="BusinessStack"
        component={BusinessStack}
      /> */}
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          // presentation: 'fullScreenModal',
          // animation: 'fade',
          // statusBarHidden: true,
          // headerShown: false,
          autoHideHomeIndicator: true,
        }}
      />
    </Stack.Navigator>
  )
}


function PaymentModalStack() {
  return (
    <Stack.Navigator

      initialRouteName='PayAmount'
      screenOptions={({ navigation }: any) => ({
        headerTitleStyle: styles.navigationHeaderTitle,
        headerStyle: styles.navigationHeader,
        headerShadowVisible: false,
        headerTintColor: colors.gold,
        headerBackTitleStyle: styles.navigationBackTitleStyle,
        // headerBackButtonMenuEnabled: true,
        headerRight: () => (
          <Pressable
            onPress={() => {
              navigation.popToTop()
              navigation.goBack()
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <FontAwesome
              name='close'
              size={25}
              color={colors.medium}
            // style={{ marginRight: 15 }}
            />
          </Pressable >
        ),
      })}
    >
      <Stack.Screen
        name="PayAmount"
        component={PayAmountScreen}
        options={({ navigation }: any) => ({
          headerTitle: 'Payment',
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.goBack()
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name='close'
                size={25}
                color={colors.medium}
              // style={{ marginRight: 15 }}
              />
            </Pressable >
          ),
        })}
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
    </Stack.Navigator >
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
        headerBackTitleStyle: styles.navigationBackTitleStyle,
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
                // marginRight: MARGIN,
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
        name="Receipt"
        component={ReceiptScreen}
        options={({ navigation }: any) => ({
          presentation: 'modal',
          headerShown: false,
          headerTitle: 'You paid',
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
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile'
        }}
      />
      <Stack.Screen
        name="About"
        component={SettingsAboutScreen}
        options={{}}
      />
      <Stack.Screen
        name="BusinessWizardProfile"
        component={BusinessWizardProfileScreen}
        options={{
          title: '',
        }}
      />
       <Stack.Screen
        name="BusinessWizardUploadImage"
        component={BusinessWizardUploadImage}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="BusinessWizardStripe"
        component={BusinessWizardStripeScreen}
        options={{
          title: '',
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
        headerBackTitleStyle: styles.navigationBackTitleStyle,
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
          tabBarIcon: ({ color, size }) => <TabBarIcon name="map-pin" color={color} size={size}/>,
          // MAYBE WE CAN MAKE THE TOP RIGHT LITTLE BUTTON PULL UP A MAP MODAL
        }}
      />

      {/* <BottomTab.Screen
        name="PayStack"
        component={PayStack}
        options={{
          // headerShown: false,
          // title: 'Pay',
          tabBarIcon: ({ color }) => <TabBarIcon name="credit-card-alt" color={color} />,
        }}
      /> */}

      <BottomTab.Screen
        name="QRScanScreen"
        component={QRScanScreen}
        options={{
          // title: 'Pockets',
          // headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View style={{borderRadius:10, backgroundColor: color, width: 45, height: 45, justifyContent: 'center'}}>
              <View style={{alignSelf: 'center'}}>
                <TabBarIcon name="qrcode" color={"white"} size={1.25*size} />
              </View>  
            </View>
              
          ),
        }}
      />

      <BottomTab.Screen
        name="WalletStack"
        component={WalletStack}
        options={({ navigation }: RootTabScreenProps<'WalletStack'>) => ({
          // title: 'Wallet',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="id-card" color={color} size = {size}/>,
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
  size: number;
}) {
  return <FontAwesome {...props} />;
}