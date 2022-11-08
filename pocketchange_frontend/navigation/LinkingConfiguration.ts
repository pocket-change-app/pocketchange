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
          Metrics: {
            screens: {
              MetricsDashboardScreen: 'metrics',
            },
          },
          Transactions: {
            screens: {
              TransactionHistoryScreen: 'transactions',
            },
          },
          Settings: {
            screens: {
              MerchantSettings: 'settings',
            }
          }
        },
      },
      ConsumerSettings: 'settings',
      
      BusinessModal: 'modal',
      TransactionModal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
