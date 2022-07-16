import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';

export default function MerchantScreen() {
  return (
    <ScrollView style={styles.container}>
      <BusinessCardSm
        name="Jimmy's Coffee"
        address="806 QUEEN ST E"
        pocket="Riverside"
      />
      <BusinessCardSm
        name="La Paella"
        address="1146 QUEEN ST E"
        pocket="Leslieville"
      />
      <BusinessCardSm
        name="Wurst"
        address="Somewhere"
        pocket="Pocket"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
