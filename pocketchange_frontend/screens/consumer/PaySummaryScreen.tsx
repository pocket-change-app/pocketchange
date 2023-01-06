import { MARGIN, styles } from "../../Styles";
import { View, Text, ScreenContainer } from '../../components/Themed'
import { ButtonWithText, SettingSwitch } from '../../components/Cards'
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
import TransactionSummary from "../../components/TransactionSummary";

export default function PaySummaryScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const { business, pocket, amount, tip } = route.params;

  const [useChange, setUseChange] = useState(true)

  const EARN_RATE = 0.1  // TODO: retrieve from backend
  const FEE_RATE = 0.05  // TODO: retrieve from backend

  const amountNum = parseFloat(amount)
  const tipNum = parseFloat(tip)
  const changeToUse = (useChange ? 2.63 : 0)
  const feeNum = ((amountNum + tipNum) * FEE_RATE)
  const total = amountNum + tipNum + feeNum - changeToUse // (amountNum + tipNum + fee)

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


        <TransactionSummary
          amount={amount}
          tip={tip}
          fee={feeNum.toFixed(2)}
          changeApplied={changeToUse.toFixed(2)}
        />

        <View style={styles.card}>
          <SettingSwitch
            settingText="Apply Change?"
            value={useChange}
            onToggle={setUseChange}
          />
        </View>

        <ButtonWithText
          color={colors.gold}
          text="Confirm and Pay"
          onPress={() => {

            const date = new Date()

            navigation.popToTop()
            navigation.goBack()

            navigation.navigate("PayConfirmation", {
              business: business,
              subtotal: total.toFixed(2),
              date: date,
            })

            // console.log('navigated to PayConfirmation')
          }}
        />



      </View>

    </SafeAreaView >
  )
}