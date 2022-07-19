import { ScrollView } from 'react-native';

import { styles } from '../Styles';
import { Text, View } from '../components/Themed';
import gold from '../constants/Colors';
import { IdCard } from '../components/Cards';
import { user } from '../dummy.tsx';

export default function WalletScreen() {
  return (
    <ScrollView style={styles.container}>
      <IdCard
        name={user.name}
        lifetimeChange={user.lifetimeChange}
        dateOfBirth={user.dateOfBirth}
        imageURL={require('../assets/images/wvrst.jpg')}
      />
    </ScrollView>
  );
}
