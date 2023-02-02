/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), "https://www.pocketchangeapp.ca/open", "https://pocketchangeapp.ca/open"],

  config: {
    initialRouteName: "Root",
    screens: {
      PaymentStack: {
        screens: {
          PayAmount: 'pay/:businessID',
          PayTip: 'tip/:businessID/:amount',
          PaySummary: 'summary/:businessID/:amount/:tip',
        },
      },
      BusinessCreationStack: 'create-business',
      Root: {
        screens: {
          ExploreStack: {
            initialRouteName: 'PocketSearch',
            screens: {
              PocketSearch: 'search',
              Map: 'map',
              Business: 'business/:businessID',
              Pocket: 'pocket/:pocketID',
            },
          },
          ScanStack: {
            initialRouteName: 'QRScan',
            screens: {
              QRScan: 'qr-scan'
            },
          },
          WalletStack: {
            initialRouteName: 'Wallet',
            screens: {
              Wallet: 'wallet',
              ConsumerSettings: 'settings',
              PayConfirmation: 'pay-confirmation',
              ScanConfirmation: 'scan-confirmation',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
