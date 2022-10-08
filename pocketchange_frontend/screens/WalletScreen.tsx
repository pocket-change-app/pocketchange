import { ScrollView } from 'react-native';

import { MARGIN, styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BalancesCard, IdCard, TransactionHistoryCard } from '../components/Cards';
import { user } from '../dummy';
import { useGetAllTransactionsQuery } from '../hooks-apollo';
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
const R = require('ramda');

export default function WalletScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext); 
  
  const userID = '1c'
  const {allTransactions, loading, error} =  useGetAllTransactionsQuery(undefined, undefined, userID, undefined, undefined, undefined)

  if (error) console.log(error);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        nestedScrollEnabled={false}>

        <IdCard
          user={authContext.userGQL}/>
        {// TODO: connect to change balance resolver
        }
        <BalancesCard
          changeTotal={user.changeTotal}
          topPockets={user.topPockets} />
        
        <TransactionHistoryCard
          navigation={navigation}
          transactions={allTransactions}
        />
        <View style={{ height: MARGIN }} />
      </ScrollView>
    </ScreenContainer>
  );
}
