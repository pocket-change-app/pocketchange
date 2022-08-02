import { styles } from "../Styles";
import { View, Text } from '../components/Themed'
import { PayAmountCard } from '../components/Cards'

export default function PayAmountScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL } = route.params;

  return (
    <View style={styles.container}>
      <Text>hiya</Text>
      {/* <PayAmountCard /> */}
    </View>
  )
}