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
  Business: undefined;

  PocketSearch: undefined;
  Pocket: undefined;

  NotFound: undefined;

  TransactionModal: undefined;
  ConsumerTransaction: undefined;

  Pay: undefined;
  PayAmount: undefined;
  PayTip: undefined;
  PaySummary: undefined;

  Wallet: undefined;
  ConsumerSettings: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  PocketStack: undefined;
  PayStack: undefined;
  WalletStack: undefined;
  Wallet: undefined;

  Analytics: undefined;
  Transactions: undefined;
  Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// asdf