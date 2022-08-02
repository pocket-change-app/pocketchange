import { styles } from "../Styles";
import { View, Text } from '../components/Themed'
import { ButtonWithText, PayAmountCard } from '../components/Cards'

export default function PayTipScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL, amount } = route.params;

  return (
    <View style={styles.container}>
      <PayAmountCard
        name={name}
        address={address}
        pocket={pocket}
        imageURL={imageURL}
        navigation={navigation}
      />

      <Text>{amount}</Text>

      <ButtonWithText
        text={'Next'}
        onPress={() => navigation.navigate("PayTip", {
          navigation: navigation,
        })}
      />
    </View>
  )
}