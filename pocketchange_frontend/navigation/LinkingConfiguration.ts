/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'https://www.pocketchangeapp.ca/open'],

  config: {
    screens: {
      Root: {
        screens: {
          PocketStack: {
            screens: {
              PocketSearch: 'pockets',
              PocketScreen: 'pocket',
            },
          },
          PayStack: {
            screens: {
              PayTabScreen: 'pay tab',
            },
          },
          WalletStack: {
            screens: {
              WalletScreen: 'wallet',
              ConsumerSettings: 'settings',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
