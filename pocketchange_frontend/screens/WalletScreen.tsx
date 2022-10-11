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
import { colors } from '../constants/Colors';

export default function WalletScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext); 
  
  const userID = authContext.userFirebase.uid // change to get id from authContext
  const { allTransactions, loading: transactionLoading, error: transactionError } =  useGetAllTransactionsQuery(undefined, undefined, userID, undefined, undefined);
  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError } = useQuery(ChangeBalanceQueries.getAllChangeBalances, { variables: { userID: userID, pocketID: undefined } });

  const allScans = user.scans


  // Construct list of all transactions and scans
  let allItems = []
  for (var i in allTransactions) {
    const t = allTransactions[i]
    const dateSecs = new Date(t.date).getTime()
    allItems.push(
      {
        scan: null,
        transaction: t,
        dateSecs: dateSecs
      }
    )
    console.log(t.date)
    console.log(console.log(dateSecs))
  }
  for (var i in allScans) {
    const s = allScans[i]
    const dateSecs = new Date(s.date).getTime()
    allItems.push(
      {
        scan: allScans[i],
        transaction: null,
        dateSecs: dateSecs
      }
    )
    console.log(s.date)
    console.log(dateSecs);

  }

  // Sort by date
  allItems.sort((a, b) => (a.dateSecs - b.dateSecs))

  if (transactionError) console.log(transactionError);
  if (changeBalanceError) console.log(changeBalanceError);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        nestedScrollEnabled={false}>

        <IdCard
          user={authContext.userGQL}/>
        {// TODO: connect to change balance resolver
        }
        {changeBalanceData ?
          <BalancesCard
            changeTotal={user.changeTotal}
            allChangeBalances={changeBalanceData.getAllChangeBalances} /> :
          <View style={[styles.card, styles.balanceCard, { justifyContent: 'center' }]}>
            <ActivityIndicator
              size="large"
              color={colors.subtle}
              style={{ margin: 10 }} />
          </View>
        }
        
        
        <HistoryCard
          navigation={navigation}
          items={allItems}
          loading={transactionLoading}
        />
        <View style={{ height: MARGIN }} />
      </ScrollView>
    </ScreenContainer>
  );
}
