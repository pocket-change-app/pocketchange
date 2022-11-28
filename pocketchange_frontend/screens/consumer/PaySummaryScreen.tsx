import { MARGIN, styles } from "../../Styles";
import { View, Text, ScreenContainer } from '../../components/Themed'
import { ButtonWithText } from '../../components/Cards'
import { HorizontalLine } from "../../components/Lines";
import { colors } from "../../constants/Colors";
import { ConsumerNavigation } from "../../navigation/ConsumerNavigation";
import { user } from "../../dummy";
import { getBackgroundColorAsync } from "expo-system-ui";
import { SafeAreaView, Switch } from 'react-native'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import PocketQueries from '../../hooks-apollo/Pocket/queries'
import { color } from "@rneui/base";

export default function PaySummaryScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const { business, pocket, amount, tip } = route.params;

  // const [useChange, setUseChange] = useState(true)

  const EARN_RATE = 0.1
  const FEE_RATE = 0.05

  const amountNum = parseFloat(amount)
  const tipNum = parseFloat(tip)
  // const changeToUse = (useChange ? 2.63 : 0)
  // const fee = ((amountNum + tipNum) * FEE_RATE)
  const total = amountNum + tipNum // (amountNum + tipNum + fee)

  // const consumerTotal = (total - changeToUse)
  // const youEarn = Math.max((amountNum - changeToUse) * EARN_RATE, 0)

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <HorizontalLine />

      <View style={[styles.container, { flex: 1 }]}>

        {/* BUSINESS */}

        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.businessListInfo}>
              <Text style={styles.businessNameSm}>{business.businessName}</Text>
              <Text style={styles.address}>{business.address.buildingNumber} {business.address.streetName}</Text>
              <Text style={styles.pocket}>{pocket.pocketName}</Text>
            </View>
          </View>
        </View>

        <View>

          <View style={[styles.card]}>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Subtotal</Text>
                <Text style={[styles.paymentSummaryText, styles.tabularNumbers, { textAlign: 'right' }]}>{amount}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: MARGIN }}>
                <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Tip</Text>
                <Text style={[styles.paymentSummaryText, styles.tabularNumbers, { textAlign: 'right' }]}>{tip}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.paymentSummaryText, { textAlign: 'left', color: colors.dark }]}>Total</Text>
                <Text style={[styles.paymentSummaryText, styles.tabularNumbers, { textAlign: 'right', color: colors.dark }]}>${total.toFixed(2)}</Text>
            </View>
            </View>
          </View>

          <ButtonWithText
            color={colors.gold}
            text={'Pay ' + business.businessName}
            onPress={() => {

              const date = new Date()

              navigation.popToTop()
              navigation.goBack()

              navigation.navigate("PayConfirmation", {
                business: business,
                subtotal: amount,
                date: date,
              })

              // console.log('navigated to PayConfirmation')
            }}
          />

        </View>
      </View>

    </SafeAreaView >
  )
}