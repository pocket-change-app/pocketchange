import { styles } from "../Styles";
import { View, Text } from '../components/Themed'
import { ButtonWithText, PayAmountCardSm, PayTipCard } from '../components/Cards'
import { TimePickerAndroid } from "react-native";

export default function PayTipScreen({ route, navigation }: { route: any, navigation: any }) {

  const { business, amount } = route.params;

  const { busID, name, address, pocket, imageURL } = business;

  const tip = 6.20

  return (
    <View style={styles.container}>
      <PayAmountCardSm
        name={name}
        address={address}
        pocket={pocket}
        imageURL={imageURL}
        amount={amount}
      />

      <PayTipCard
        amount={amount}
      />

      <ButtonWithText
        text={'Next'}
        onPress={() => navigation.navigate("PaySummary", {
          // navigation: navigation,
          busID: busID,
          name: name,
          address: address,
          pocket: pocket,
          imageURL: imageURL,
          amount: amount,
          tip: tip,
        })}
      />
    </View>
  )
}