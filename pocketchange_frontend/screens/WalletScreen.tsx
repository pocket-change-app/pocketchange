import { ScrollView } from 'react-native';

import { MARGIN, styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BalancesCard, IdCard, TransactionHistoryCard } from '../components/Cards';
import { user } from '../dummy';
import { useGetAllTransactionsQuery } from '../hooks-apollo';
const R = require('ramda');

export default function WalletScreen({ navigation }: { navigation: any }) {
  const userID = '1c'
  const {allTransactions, loading} =  useGetAllTransactionsQuery(undefined, undefined, userID, undefined, undefined)
  if(R.isNil(allTransactions) ){
    return null
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        nestedScrollEnabled={false}
      >
        <IdCard
          name={user.name}
          lifetimeChange={user.lifetimeChange}
          dateOfBirth={user.dateOfBirth}
          imageURL={user.imageURL}
        />
        <BalancesCard
          changeTotal={user.changeTotal}
          topPockets={user.topPockets}
        />
        <TransactionHistoryCard
          navigation={navigation}
          transactions={allTransactions}
        />
        <View style={{ height: MARGIN }} />
      </ScrollView>
    </ScreenContainer>
  );
}
