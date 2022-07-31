import { ScrollView } from 'react-native';

import { styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import gold from '../constants/Colors';
import { BalancesCard, IdCard } from '../components/Cards';
import { user } from '../dummy';

export default function AnalyticsDashboardScreen() {
  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
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
      </ScrollView>
    </ScreenContainer>
  );
}