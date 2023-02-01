import { MARGIN, styles } from "../../Styles";
import { View, Text, ScreenContainer } from '../../components/Themed'
import { BusinessCardSm, ButtonWithText, SettingSwitch } from '../../components/Cards'
import { HorizontalLine } from "../../components/Lines";
import { colors } from "../../constants/Colors";
import { ConsumerNavigation } from "../../navigation/ConsumerNavigation";
import { user } from "../../dummy";
import { getBackgroundColorAsync } from "expo-system-ui";
import { Alert, SafeAreaView, Switch } from 'react-native'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import PocketQueries from '../../hooks-apollo/Pocket/queries'
import { color } from "@rneui/base";
import TransactionSummary from "../../components/TransactionSummary";
import { useBusinessQuery, usePocketQuery } from "../../hooks-apollo";
import useGetAllChangeBalances from "../../hooks-apollo/ChangeBalance/useGetAllChangeBalancesQuery";
import { useStripe } from "@stripe/stripe-react-native";
import Constants from 'expo-constants';


export default function PaySummaryScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const { businessID, pocketID, amount, tip } = route.params;

  const { data: businessData, loading: businessLoading, error: businessError, refetch: refetchBusiness } = useBusinessQuery(businessID)
  if (businessError) return (<Text>Business error: {businessError.message}</Text>)

  const { data: pocketData, loading: pocketLoading, error: pocketError, refetch: refetchPocket } = usePocketQuery(pocketID)
  if (pocketError) return (<Text>Pocket error: {pocketError.message}</Text>)
  const pocket = pocketData?.pocket;

  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError, refetch: refetchChangeBalances } = useGetAllChangeBalances(authContext.userFirebase.uid, pocketID);
  if (changeBalanceError) return (<Text>Change Balance error: {changeBalanceError.message}</Text>)


  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  // const [useChange, setUseChange] = useState(true)

  const [useChange, setUseChange] = useState(true)

  const hasChange = Boolean(changeBalanceData?.value)

  const EARN_RATE = 0.1  // TODO: retrieve from backend
  const FEE_RATE = 0.05  // TODO: retrieve from backend

  const amountNum = parseFloat(amount)
  const tipNum = parseFloat(tip)
  const changeToUse = ((hasChange && useChange) ? changeBalanceData?.value : 0)
  const feeNum = ((amountNum + tipNum) * FEE_RATE)
  const total = amountNum + tipNum + feeNum - changeToUse // (amountNum + tipNum + fee)
  const totalInCents = Math.round(total * 100)

  // const consumerTotal = (total - changeToUse)
  // const youEarn = Math.max((amountNum - changeToUse) * EARN_RATE, 0)

  const BACKEND_URL = Constants.manifest?.extra?.backendURL;

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${BACKEND_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "amount": totalInCents })
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      //customFlow: true,
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      //allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      // Alert.alert('Success', 'Your order is confirmed!');


      const date = new Date()

      navigation.popToTop()
      navigation.goBack()

      navigation.navigate("PayConfirmation", {
        businessID: businessID,
        pocketID: pocketID,
        subtotal: total.toFixed(2),
        date: date,
      })

      console.log('navigated to PayConfirmation')
    }
  };


  useEffect(() => {
    initializePaymentSheet();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <HorizontalLine />

      <View style={[styles.container, { flex: 1 }]}>

        {/* BUSINESS */}

        <BusinessCardSm
          businessID={businessID}
          hideImage
          wrapText
        />

        <View style={{ height: MARGIN }} />


        <TransactionSummary
          amount={amount}
          tip={tip}
          fee={feeNum.toFixed(2)}
          changeApplied={changeToUse?.toFixed(2)}
          hasChange={hasChange}
        />
        <View style={styles.card}>
          {hasChange ? (

          <SettingSwitch
            settingText="Apply Change?"
            value={useChange}
            onToggle={setUseChange}
          />

          ) : (
            <View style={styles.container}>
              <Text style={[styles.paymentSummaryText, { textAlign: 'center' }]}>
                Once you have some Change in {pocket.pocketName}, you can spend it here!
              </Text>
            </View>

          )}
        </View>

        <ButtonWithText
          color={colors.gold}
          text="Confirm and Pay"
          onPress={openPaymentSheet}
        />



      </View>

    </SafeAreaView >
  )
}