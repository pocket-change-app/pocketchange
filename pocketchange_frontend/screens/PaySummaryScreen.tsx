import { MARGIN, styles } from "../Styles";
import { View, Text, ScreenContainer } from '../components/Themed'
import { ButtonWithText, PaySummaryCard } from '../components/Cards'
import { HorizontalLine } from "../components/Lines";
import { colors } from "../constants/Colors";
import { ConsumerNavigation } from "../navigation/ConsumerNavigation";
import { user } from "../dummy";
import { getBackgroundColorAsync } from "expo-system-ui";
import { Switch } from 'react-native'
import { useState } from "react";

export default function PaySummaryScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL, amount, tip } = route.params;

  const [useChange, setUseChange] = useState(true)

  const EARN_RATE = 0.1
  const FEE_RATE = 0.05

  const amountNum = parseFloat(amount)
  const tipNum = parseFloat(tip)
  const changeToUse = (useChange ? 2.63 : 0)
  const fee = ((amountNum + tipNum) * FEE_RATE)
  const total = (amountNum + tipNum + fee)



  const consumerTotal = (total - changeToUse)
  const youEarn = Math.max((amountNum - changeToUse) * EARN_RATE)

  return (
    <ScreenContainer>
      <View style={[styles.container, { flex: 1, justifyContent: 'center' }]}>
        <View style={styles.card}>
          {/* <CardHeader text='Summary' /> */}

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.businessListInfo}>
              <Text style={styles.businessNameSm}>{name}</Text>
              <Text style={styles.address}>{address}</Text>
              <Text style={styles.pocket}>{pocket}</Text>
            </View>
          </View>
        </View>


        {/* <View style={styles.card}> */}

        <View style={[styles.card, styles.container]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Subtotal</Text>
            <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>{amount}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Tip</Text>
            <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>{tip}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Fees</Text>
            <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>{fee.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: MARGIN }}>
            <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Total</Text>
            <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={[styles.card, styles.container]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.pocket, { color: colors.medium, textAlign: 'left' }]}>Use {pocket} Change?</Text>
            <Switch
              trackColor={{ false: colors.subtle, true: colors.gold }}
              thumbColor={colors.card}
              ios_backgroundColor={colors.subtle}
              onValueChange={setUseChange}
              value={useChange}
            />
          </View>
        </View>

        <View style={[styles.card, styles.container]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Change Applied</Text>
            <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>-{changeToUse}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.paymentSummaryText, { color: colors.dark, textAlign: 'left' }]}>You Pay</Text>
            <Text style={[styles.paymentSummaryText, { color: colors.dark, textAlign: 'right' }]}>${consumerTotal.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.paymentSummaryText, { color: colors.gold, textAlign: 'left' }]}>You Earn</Text>
            <Text style={[styles.paymentSummaryText, { color: colors.gold, textAlign: 'right' }]}>${youEarn.toFixed(2)}</Text>
          </View>
        </View>
        {/* </View> */}

        <ButtonWithText
          color={colors.gold}
          text={'Pay ' + name}
          onPress={() => {

            const d = new Date()
            const date = d.toDateString()
            const time = d.toTimeString()

            navigation.popToTop()
            navigation.goBack()

            console.log('made it')

            navigation.navigate("PayConfirmation", {
              // navigation: navigation,
              businessName: name,
              subtotal: amount,
              date: date,
              time: time,
            })

            console.log('navigated to PayConfirmation')
          }}
        />
      </View>
    </ScreenContainer>
  )
}