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

  const authContext = useContext(AuthContext); 
  
  const userID = authContext.userFirebase.uid;

  const transactionsQuery = useGetAllTransactionsQuery(undefined, undefined, userID, undefined, undefined)
  const changeBalanceQuery = useGetAllChangeBalancesQuery(userID, undefined)

  const { data: transactionData, loading: transactionLoading, error: transactionError, refetch: refetchTransactions } = transactionsQuery
  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError, refetch: refetchChangeBalances } = changeBalanceQuery
  const { data: QRScansData, loading: QRScansLoading, error: QRScansError, refetch: refetchQRScans } = useGetAllQRScansQuery(userID);
  
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      refetchChangeBalances,
      refetchTransactions,
    ]).then(() => setRefreshing(false));
  }, []);

  if (QRScansError) return(<Text>{QRScansError.message}</Text>);
  if (transactionsError) return(<Text>{transactionsError.message}</Text>);
  if (changeBalanceError) return(<Text>{changeBalanceError.message}</Text>);

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

        <IdCard
          user={authContext.userGQL}/>
        {// TODO: connect to change balance resolver
        }
        {/* {changeBalanceData ?
          <BalancesCard
            changeTotal={user.changeTotal}
            allChangeBalances={changeBalanceData?.getAllChangeBalances} /> :
          <View style={[styles.card, styles.balanceCard, { justifyContent: 'center' }]}>
            <ActivityIndicator
              size="large"
              color={colors.subtle}
              style={{ margin: 10 }} />
          </View>
        } */}
        
        {(transactionsLoading || QRScansLoading) ?
          <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} /> :
          <HistoryCard
            navigation={navigation}
            allTransactions={transactionsData?.getAllTransactions}
            allQRScans={QRScansData?.getAllQRScans}/>
        }
        
        <View style={{ height: MARGIN }} />
      </ScrollView>
    </ScreenContainer>
  );
}
