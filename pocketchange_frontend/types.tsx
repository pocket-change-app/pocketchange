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

  Map: undefined;

  NotFound: undefined;

  Receipt: undefined;

  PaymentStack: undefined;
  Pay: undefined;
  PayAmount: undefined;
  PayTip: undefined;
  PaySummary: undefined;
  PayConfirmation: undefined;
  ScanConfirmation: undefined;

  QRScan: undefined;

  Wallet: undefined;
  ConsumerSettings: undefined;
  EditProfile: undefined;
  BusinessWizardProfile: undefined;
  BusinessWizardStripe: undefined;

  Survey: undefined;

  // Merchant Screens
  Transactions: undefined;
  Transaction: undefined;
  NewTransaction: undefined;

  MerchantMetrics: undefined;

  MerchantSettings: undefined;
  EditEmployees: undefined;
  SettingsTipping: undefined;

  // Leader Screens
  LeaderMetrics: undefined;

  Contests: undefined;
  ContestWizard: undefined;
  ContestWizardSummary: undefined;

  LeaderSettings: undefined;

  // Shared Screens
  Contest: undefined;
  About: undefined;

};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {

  // Consumer tabs
  ExploreStack: undefined;
  ScanStack: undefined; s
  WalletStack: undefined;

  // Merchant Tabs
  TransactionsStack: undefined;
  Metrics: undefined;
  MerchantSettingsStack: undefined;

  // Leader Tabs
  LeaderMetricsStack: undefined;
  ContestsStack: undefined;
  LeaderSettingsStack: undefined;

};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// asdf