/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;

  Landing: undefined;
  SignUp: undefined;
  ViewPDF: undefined;

  // Consumer Screens

  Business: undefined;

  PocketSearch: undefined;
  Pocket: undefined;
  Competition: undefined;

  NotFound: undefined;

  Receipt: undefined;

  PaymentModalStack: undefined;
  Pay: undefined;
  PayAmount: undefined;
  PayTip: undefined;
  PaySummary: undefined;
  PayConfirmation: undefined;

  ScanConfirmation: undefined;

  Wallet: undefined;
  ConsumerSettings: undefined;
  EditProfile: undefined;
  BusinessWizardProfile: undefined;
  BusinessWizardStripe: undefined;

  // Merchant Screens
  Transactions: undefined;
  TransactionModal: undefined;

  MerchantAnalytics: undefined;

  MerchantSettings: undefined;
  EditEmployees: undefined;
  SettingsTipping: undefined;

  // Leader Screens
  LeaderAnalytics: undefined;
  Competitions: undefined;
  LeaderSettings: undefined;

};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {

  // Consumer tabs
  PocketStack: undefined;
  PayStack: undefined;
  WalletStack: undefined;

  // Merchant Tabs
  TransactionsStack: undefined;
  Analytics: undefined;
  MerchantSettingsStack: undefined;

  // Leader Tabs
  LeaderAnalyticsStack: undefined;
  CompetitionsStack: undefined;
  LeaderSettingsStack: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// asdf