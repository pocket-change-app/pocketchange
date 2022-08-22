import { MARGIN, styles } from "../Styles";
import { View, Text, ScreenContainer } from '../components/Themed'
import { ButtonWithText, PaySummaryCard } from '../components/Cards'
import { HorizontalLine } from "../components/Lines";
import { colors } from "../constants/Colors";
import { ConsumerNavigation } from "../navigation/ConsumerNavigation";
import { user } from "../dummy";

export default function PaySummaryScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL, amount, tip } = route.params;

  const changeUsed = '2.63'

  const amountNum = parseFloat(amount)
  const tipNum = parseFloat(tip)
  const total = (amountNum + tipNum).toFixed(2)
  const consumerTotal = (amountNum + tipNum - 2.63).toFixed(2)

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
              <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>-{changeUsed}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: MARGIN }}>
              <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Total</Text>
              <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>${consumerTotal}</Text>
            </View>
          </View>
        </View>

        <ButtonWithText
          text={'Confirm'}
          onPress={() => {

            const d = new Date()
            const date = d.toDateString()
            const time = d.toTimeString()

            navigation.popToTop()
            navigation.goBack()

            navigation.navigate("PayConfirmation", {
              // navigation: navigation,
              businessName: name,
              total: total,
              date: date,
              time: time,
            })
          }}
        />
      </View>
    </ScreenContainer>
  )
}