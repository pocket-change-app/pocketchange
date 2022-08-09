import { styles } from "../Styles";
import { View, Text, ScreenContainer } from '../components/Themed'
import { ButtonWithText, PaySummaryCard } from '../components/Cards'

export default function PaySummaryScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL, amount, tip } = route.params;

  // const amount = '2.50' // dummy val for consumer entered amount

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <PaySummaryCard
          name={name}
          address={address}
          pocket={pocket}
          imageURL={imageURL}
          amount={amount}
          tip={tip}
        />

        <ButtonWithText
          text={'Confirm'}
          onPress={() => navigation.navigate("PayConfirmation", {
            // navigation: navigation,
            busID: busID,
            name: name,
            address: address,
            pocket: pocket,
            imageURL: imageURL,
            amount: amount,
          })}
        />
      </View>
    </ScreenContainer>
  )
}