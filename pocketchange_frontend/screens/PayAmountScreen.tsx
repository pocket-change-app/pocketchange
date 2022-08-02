import { styles } from "../Styles";
import { View, Text } from '../components/Themed'
import { ButtonWithText, PayAmountCard } from '../components/Cards'

export default function PayAmountScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL } = route.params;

  const amount = '2.50' // dummy val for consumer entered amount

  return (
    <View style={styles.container}>
      <PayAmountCard
        name={name}
        address={address}
        pocket={pocket}
        imageURL={imageURL}
        navigation={navigation}
      />

      <ButtonWithText
        text={'Next'}
        onPress={() => navigation.navigate("PayTip", {
          // navigation: navigation,
          busID: busID,
          name: name,
          address: address,
          pocket: pocket,
          imageURL: imageURL,
          amount: amount
        })}
      />
    </View>
  )
}