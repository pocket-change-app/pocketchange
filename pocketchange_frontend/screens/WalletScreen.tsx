import { ActivityIndicator, ScrollView } from 'react-native';

import { MARGIN, styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BalancesCard, IdCard, TransactionHistoryCard } from '../components/Cards';
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
  
  const userID = '1c' // authContext.userFirebase.uid // change to get id from authContext
  const { allTransactions, loading: transactionLoading, error: transactionError } =  useGetAllTransactionsQuery(undefined, undefined, userID, undefined, undefined);
  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError } = useQuery(ChangeBalanceQueries.getAllChangeBalances, { variables: { userID: userID, pocketID: undefined } });
  
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
        
        
        <TransactionHistoryCard
          navigation={navigation}
          transactions={allTransactions}
          loading={transactionLoading}
        />
        <View style={{ height: MARGIN }} />
      </ScrollView>
    </ScreenContainer>
  );
}
