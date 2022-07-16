import { ScrollView } from 'react-native';

import { styles } from '../Styles';
import { Text, View } from '../components/Themed';
import gold from '../constants/Colors';
import { IdCard } from '../components/Cards';

export default function WalletScreen() {
  return (
    <ScrollView style={styles.container}>
      <IdCard 
        name="Elias Williams" 
        lifetimeChange={12345}
        dateOfBirth='12/16/1998'
      />
    </ScrollView>
  );
}
