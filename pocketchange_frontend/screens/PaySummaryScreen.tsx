import { MARGIN, styles } from "../Styles";
import { View, Text, ScreenContainer } from '../components/Themed'
import { ButtonWithText, PaySummaryCard } from '../components/Cards'
import { HorizontalLine } from "../components/Lines";
import { colors } from "../constants/Colors";

export default function PaySummaryScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL, amount, tip } = route.params;

  const amountNum = parseFloat(amount)
  const tipNum = parseFloat(tip)

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* <CardHeader text='Summary' /> */}

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.businessListInfo}>
              <Text style={styles.businessNameSm}>{name}</Text>
              <Text style={styles.address}>{address}</Text>
              <Text style={styles.pocket}>{pocket}</Text>
            </View>
          </View>

          <HorizontalLine />

          <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Subtotal</Text>
              <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>{amount}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Tip</Text>
              <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>{tip}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Change Used</Text>
              <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>-{'2.63'}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: MARGIN }}>
              <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Total</Text>
              <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>${(amountNum + tipNum - 2.63).toFixed(2)}</Text>
            </View>
          </View>
        </View>

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