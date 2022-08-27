import { MARGIN, styles } from "../Styles";
import { View, Text, ScreenContainer } from '../components/Themed'
import { ButtonWithText, PayAmountCardSm, CardHeader, PayTipCard } from '../components/Cards'
import { KeyboardAvoidingView, Platform, Pressable, TextInput, TimePickerAndroid } from "react-native";
import { HorizontalLine } from "../components/Lines";
import { useState } from "react";
import { colors } from "../constants/Colors";
import { Button } from "@rneui/base";

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
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : "height"}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }}
      >
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
            </View>

            <View style={[styles.card, styles.container]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Amount</Text>
                <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>${amount}</Text>
              </View>
            </View>

            <View style={styles.card}>
              {/* <View style={styles.cardHeader}> */}
              <View style={{ marginTop: MARGIN / 2 }}>
                <Text style={[styles.paymentFocusText, { alignSelf: 'center' }]}>Tip</Text>
              </View>
              {/* </View> */}
              <View style={styles.container}>
                <View style={[{ flexDirection: 'row', marginBottom: MARGIN }]}>
                  <TipButton
                    tipAmount={1}
                    amount={amount}
                    business={business}
                    navigation={navigation}
                  />
                  <View style={{ width: MARGIN }} />
                  <TipButton
                    tipAmount={2}
                    amount={amount}
                    business={business}
                    navigation={navigation}
                  />
                  <View style={{ width: MARGIN }} />
                  <TipButton
                    tipAmount={5}
                    amount={amount}
                    business={business}
                    navigation={navigation}
                  />
                </View>

                <View style={[{ flexDirection: 'row', marginBottom: MARGIN }]}>
                  {/* <TipButton percentage={15} />
                  <View style={{ width: MARGIN }} /> */}
                  <TipButton
                    tipPercentage={18}
                    amount={amount}
                    business={business}
                    navigation={navigation}
                  />
                  <View style={{ width: MARGIN }} />
                  <TipButton
                    tipPercentage={20}
                    amount={amount}
                    business={business}
                    navigation={navigation}
                  />
                </View>

                <ButtonWithText
                  negativeStyle
                  text='Custom'
                  onPress={null}
                />
              </View>

              {/* <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'center' }]}>

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
                  // autoFocus={true}
                  keyboardType='numeric'
                  style={styles.paymentInputText}
                  value={tip.toString()}
                  onChangeText={updateTipByAmount}
                />

              </View> */}

              {/* <HorizontalLine /> */}
            </View>

            {/* <ButtonWithText
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
            /> */}
          </View>
        </View>

      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}

function TipButton({ business, amount, tipAmount, tipPercentage, navigation }: { business: any, amount: string, tipAmount: number, tipPercentage: number, navigation: any }) {

  const { busID, name, address, pocket, imageURL } = business;

  if (tipAmount) {

    return (
      // <ButtonWithText
      //   negativeStyle
      //   text={'$' + amount.toFixed(2)}
      //   onPress={null}
      // />

      <Pressable
        style={{ flex: 1 }}
        onPress={() => navigation.navigate('PaySummary', {
          busID: busID,
          name: name,
          address: address,
          pocket: pocket,
          imageURL: imageURL,
          amount: parseFloat(amount).toFixed(2),
          tip: tipAmount.toFixed(2),
        })}>
        <View style={[styles.buttonBordered, { borderColor: colors.gold }]}>
          <Text style={[styles.tipButtonText, { color: colors.gold }]}>{'$' + tipAmount.toFixed(2)}</Text>
        </View>
      </Pressable>
    )

  } else if (tipPercentage) {

    return (
      // <ButtonWithText
      //   negativeStyle
      //   text={percentage.toString() + '%'}
      //   onPress={null}
      // />

      <Pressable
        style={{ flex: 1 }}
        onPress={() => navigation.navigate('PaySummary', {
          busID: busID,
          name: name,
          address: address,
          pocket: pocket,
          imageURL: imageURL,
          amount: parseFloat(amount).toFixed(2),
          tip: (parseFloat(amount) * tipPercentage / 100).toFixed(2),
        })}>
        <View style={[styles.buttonBordered, { borderColor: colors.gold }]}>
          <Text style={[styles.tipButtonText, { color: colors.gold }]}>{tipPercentage.toString() + '%'}</Text>
        </View>
      </Pressable>
    )

  }

}