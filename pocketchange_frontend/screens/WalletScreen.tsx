import { ScrollView } from 'react-native';

import { styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import gold from '../constants/Colors';
import { BalancesCard, IdCard, TransactionHistoryCard } from '../components/Cards';
import { user } from '../dummy';

export default function WalletScreen({ navigation }: { navigation: any }) {
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
          transactions={user.transactions}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
