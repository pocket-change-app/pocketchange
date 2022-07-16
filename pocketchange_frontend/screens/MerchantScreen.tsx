import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';

export default function MerchantScreen() {
  return (
    <View style={styles.container}>
      <BusinessCardSm name="Jimmy's Coffee" address="806 QUEEN ST E" pocket="Riverside" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
