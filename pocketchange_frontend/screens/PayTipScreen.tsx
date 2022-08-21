import { MARGIN, styles } from "../Styles";
import { View, Text, ScreenContainer } from '../components/Themed'
import { ButtonWithText, PayAmountCardSm, CardHeader, PayTipCard } from '../components/Cards'
import { KeyboardAvoidingView, TextInput, TimePickerAndroid } from "react-native";
import { HorizontalLine } from "../components/Lines";
import { useState } from "react";
import { colors } from "../constants/Colors";

export default function PayTipScreen({ route, navigation }: { route: any, navigation: any }) {

  const { business, amount } = route.params;

  const { busID, name, address, pocket, imageURL } = business;

  const [percentage, setPercentage] = useState('20')
  const [tip, setTip] = useState((amount * parseFloat(percentage) / 100).toString())

  function updateTipByPercentage(p: string) {
    setPercentage(p)
    setTip((p == '') ? '0.00' : (parseFloat(p) / 100 * amount).toFixed(2))
  }

  function updateTipByAmount(t: string) {
    setTip(t)
    setPercentage((t == '') ? '0.0' : (parseFloat(t) / amount * 100).toFixed(0))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScreenContainer>
        <View style={[styles.container, { flex: 1, justifyContent: 'center' }]}>
          <View>
            <View style={styles.card}>
              {/* <CardHeader text='Pay' /> */}

              <View style={{ flexDirection: 'row' }}>
                <View style={styles.businessListInfo}>
                  <Text style={styles.businessNameSm}>{name}</Text>
                  <Text style={styles.address}>{address}</Text>
                  <Text style={styles.pocket}>{pocket}</Text>
                </View>
              </View>

              <HorizontalLine />

              <View style={styles.container}>
                <Text style={[styles.paymentInputText, { textAlign: 'center', color: colors.gold }]}>${amount}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <CardHeader text='Tip' />

              <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'center' }]}>

                <TextInput
                  keyboardType='numeric'
                  style={styles.paymentInputText}
                  value={percentage.toString()}
                  onChangeText={updateTipByPercentage}
                />
                <Text style={styles.paymentInputText}>%</Text>

                <Text style={styles.paymentInputText}>  =  </Text>

                <Text style={styles.paymentInputText}>$</Text>
                <TextInput
                  keyboardType='numeric'
                  style={styles.paymentInputText}
                  value={tip.toString()}
                  onChangeText={updateTipByAmount}
                />

              </View>

              {/* <HorizontalLine /> */}
            </View>

            <ButtonWithText
              text={'Next'}
              onPress={() => navigation.navigate("PaySummary", {
                // navigation: navigation,
                busID: busID,
                name: name,
                address: address,
                pocket: pocket,
                imageURL: imageURL,
                amount: parseFloat(amount).toFixed(2),
                tip: parseFloat(tip).toFixed(2),
              })}
            />
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  )
}