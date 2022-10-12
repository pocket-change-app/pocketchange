import { ActivityIndicator, ScrollView } from 'react-native';

import { MARGIN, styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BalancesCard, IdCard, HistoryCard } from '../components/Cards';
import { user } from '../dummy';
import { useGetAllTransactionsQuery } from '../hooks-apollo';
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
const R = require('ramda');

import { useQuery } from '@apollo/react-hooks'
import ChangeBalanceQueries from '../hooks-apollo/ChangeBalance/queries'
import QRScanQueries from '../hooks-apollo/QRScan/queries'
import { colors } from '../constants/Colors';

export default function WalletScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext); 
  
  const userID = authContext.userFirebase.uid // change to get id from authContext
  const { allTransactions, loading: transactionLoading, error: transactionError } =  useGetAllTransactionsQuery(undefined, undefined, userID, undefined, undefined);
  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError } = useQuery(ChangeBalanceQueries.getAllChangeBalances, { variables: { userID: userID, pocketID: undefined } });

  //const allScans = user.scans
  const { data: scansData, loading: scansLoading, error: scansError } = useQuery(QRScanQueries.getAllQRScans, { variables: { userID: userID } });

  if (transactionError) return(<Text>{transactionError.message}</Text>);
  if (changeBalanceError) return(<Text>{changeBalanceError.message}</Text>);
  if (scansError) return(<Text>{scansError.message}</Text>);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        nestedScrollEnabled={false}>

        <IdCard
          user={authContext.userGQL}/>
        {// TODO: connect to change balance resolver
        }
        {/* {changeBalanceData ?
          <BalancesCard
            changeTotal={user.changeTotal}
            allChangeBalances={changeBalanceData.getAllChangeBalances} /> :
          <View style={[styles.card, styles.balanceCard, { justifyContent: 'center' }]}>
            <ActivityIndicator
              size="large"
              color={colors.subtle}
              style={{ margin: 10 }} />
          </View>
        } */}
        
        {(transactionLoading || scansLoading) ?
        <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} /> :
        <HistoryCard
        navigation={navigation}
        allTransactions={allTransactions}
        allQRScans={scansData}
        
      />
        }
        
        <View style={{ height: MARGIN }} />
      </ScrollView>
    </ScreenContainer>
  );
}
