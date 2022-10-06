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

  Business: undefined;

  PocketSearch: undefined;
  Pocket: undefined;

  NotFound: undefined;

  Receipt: undefined;

  PaymentModalStack: undefined;
  Pay: undefined;
  PayAmount: undefined;
  PayTip: undefined;
  PaySummary: undefined;
  PayConfirmation: undefined;

  Wallet: undefined;
  ConsumerSettings: undefined;
  EditProfile: undefined;
  BusinessWizardProfile: undefined;
  BusinessWizardStripe: undefined;

  // Merchant Screens
  Transactions: undefined;
  TransactionModal: undefined;

  Analytics: undefined;

  MerchantSettings: undefined;
  EditEmployees: undefined;
  SettingsTipping: undefined;

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
  // Wallet: undefined;

  // Merchant Tabs
  Transactions: undefined;
  TransactionsStack: undefined;
  Analytics: undefined;

  Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// asdf