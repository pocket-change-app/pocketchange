import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';

import { MARGIN, styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BalancesCard, IdCard, HistoryCard } from '../components/Cards';
import { user } from '../dummy';
import { useGetAllTransactionsQuery } from '../hooks-apollo';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../contexts/Auth';
const R = require('ramda');

import ChangeBalanceQueries from '../hooks-apollo/ChangeBalance/queries'
import QRScanQueries from '../hooks-apollo/QRScan/queries'
import { colors } from '../constants/Colors';
import useGetAllChangeBalancesQuery from '../hooks-apollo/ChangeBalance/useGetAllChangeBalancesQuery';
import useGetAllQRScansQuery from '../hooks-apollo/QRScan/useGetAllQRScansQuery';
import wait, { waitTimes } from '../utils/wait';

export default function WalletScreen({ navigation }: { navigation: any }) {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
    ]).then(() => setRefreshing(false));
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.container}
        nestedScrollEnabled={false}>

        <IdCard />
        {/* // TODO: connect to change balance resolver  */}
        {/* <BalancesCard /> */}

        <HistoryCard navigation={navigation} />

        <View style={{ height: MARGIN }} />
      </ScrollView>
    </ScreenContainer>
  );
}
