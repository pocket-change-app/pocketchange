/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Pockets: {
            screens: {
              PocketTabScreen: 'pockets tab',
              PocketScreen: 'pocket',
            },
          },
          Pay: {
            screens: {
              PayTabScreen: 'pay tab',
            },
          },
          Wallet: {
            screens: {
              WalletScreen: 'wallet tab',
            },
          },
          Analytics: {
            screens: {
              AnalyticsDashboardScreen: 'analytics',
            },
          },
          Transactions: {
            screens: {
              TransactionHistoryScreen: 'transactions',
            },
          },
        },
      },
      ConsumerSettings: 'settings',
      MerchantSettings: 'settings',
      BusinessModal: 'modal',
      TransactionModal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
