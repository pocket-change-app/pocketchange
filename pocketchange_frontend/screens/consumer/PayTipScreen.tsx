import { MARGIN, styles } from "../../Styles";
import { View, Text, ScreenContainer } from '../../components/Themed'
import { BusinessCardSm, ButtonWithText } from '../../components/Cards'
import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, TextInput, Touchable, TouchableWithoutFeedback } from "react-native";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { HorizontalLine } from "../../components/Lines";
import { useHeaderHeight } from '@react-navigation/elements'



export default function PayTipScreen({ route, navigation }: { route: any, navigation: any }) {

  // const authContext = useContext(AuthContext); 

  const { businessID, pocketID, amount } = route.params;

  //// STATES ////
  const [customTipFocus, setCustomTipFocus] = useState(false)

  const [customTip, setCustomTip] = useState('')
  // const [percentage, setPercentage] = useState('20')
  // const [tip, setTip] = useState((amount * parseFloat(percentage) / 100).toString())

  // function updateTipByPercentage(p: string) {
  //   setPercentage(p)
  //   setTip((p == '') ? '0.00' : (parseFloat(p) / 100 * amount).toFixed(2))
  // }

  // function updateTipByAmount(t: string) {
  //   setTip(t)
  //   setPercentage((t == '') ? '0.0' : (parseFloat(t) / amount * 100).toFixed(0))
  // }


  const navigateToPaySummary = (amount: string, tip: string) => {
    navigation.navigate('PaySummary', {
      businessID: businessID,
      pocketID: pocketID,
      amount: amount,
      tip: tip,
    })
  }


  function TipButton({ tipAmount, isPercentage = false }: { tipAmount: number, isPercentage?: boolean }) {

    let buttonText: string;
    let tip: number;

    if (isPercentage) {
      buttonText = tipAmount.toString() + '%';
      tip = amount * tipAmount / 100;

    } else {
      buttonText = '$' + tipAmount.toFixed(2);
      tip = tipAmount
    }

    return (
      <ButtonWithText
        negativeStyle
        text={buttonText}
        textStyle={styles.tipButtonText}
        color={colors.gold}
        viewStyle={{ flex: 1 }}
        onPress={() => navigateToPaySummary(
          amount,
          tip.toFixed(2),
        )}
      />
    )
  }

  const TipOptions = () => {

    return (

      <View style={styles.card}>
        {/* <View style={styles.cardHeader}> */}
        <View style={{ marginTop: MARGIN / 2 }}>
        </View>
        {/* </View> */}
        <View style={styles.container}>
          <View style={[{ flexDirection: 'row', marginBottom: MARGIN }]}>

            <TipButton tipAmount={1} />

            <View style={{ width: MARGIN }} />

            <TipButton tipAmount={2} />

            <View style={{ width: MARGIN }} />

            <TipButton tipAmount={5} />

          </View>

          <View style={[{ flexDirection: 'row', marginBottom: MARGIN }]}>

            <TipButton tipAmount={18} isPercentage />

            <View style={{ width: MARGIN }} />

            <TipButton tipAmount={20} isPercentage />

          </View>

          <ButtonWithText
            negativeStyle
            text='Custom Tip'
            textStyle={styles.tipButtonText}
            viewStyle={{ marginBottom: MARGIN }}
            textTransform='none'
            color={colors.gold}
            onPress={() => setCustomTipFocus(true)} //TODO: make custom tip modal
          />

          <ButtonWithText
            negativeStyle
            text='No Tip'
            textTransform='none'
            textStyle={styles.tipButtonText}
            color={colors.gold}
            onPress={() => navigateToPaySummary(
              amount,
              '0.00',
            )}
          />

        </View>

      </View>
    )
  }



  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={useHeaderHeight()}
      style={{ flex: 1 }}
    >
      {/* <TouchableWithoutFeedback
        onPress={() => setCustomTipFocus(false)}
      > */}

        <SafeAreaView style={{ flex: 1 }}>

          <HorizontalLine />

          <View style={[styles.container, { flex: 1 }]}>

          {/* <View> */}

          {/* BUSINESS */}

          <BusinessCardSm
            businessID={businessID}
            hideImage
            wrapText
          />

          <View style={{ height: MARGIN }} />

          {/* SUBTOTAL */}

          <View style={[styles.card, styles.container]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Subtotal</Text>
              <Text style={[styles.paymentSummaryText, styles.tabularNumbers, { textAlign: 'right' }]}>${amount}</Text>
            </View>
          </View>

          {/* </View> */}



            <View style={[{ flex: 1, justifyContent: 'center' }]}>

              {/* TIP OPTIONS */}

              {(customTipFocus)
                ? (
                  <CustomTipEntry
                    customTip={customTip}
                    setCustomTip={setCustomTip}
                  setCustomTipFocus={setCustomTipFocus}
                  onSubmit={() => navigateToPaySummary(
                    amount,
                    parseFloat(customTip).toFixed(2),
                  )}
                  />
                ) : (<TipOptions />)
              }

          </View>

          <View style={styles.container}>

          </View>

        </View>

      </SafeAreaView>

      {/* </TouchableWithoutFeedback> */}

    </KeyboardAvoidingView>
  )
}

const CustomTipEntry = ({ customTip, setCustomTip, setCustomTipFocus, onSubmit }: { customTip: string, setCustomTip: Dispatch<SetStateAction<string>>, setCustomTipFocus: Dispatch<SetStateAction<boolean>>, onSubmit: () => void }) => {

  const customTipValid = (parseFloat(customTip) > 0)

  return (
    <>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.paymentFocusText}>$</Text>
          <TextInput
            autoFocus
            selectionColor={colors.gold}
            style={styles.paymentFocusText}
            keyboardType='numeric'
            value={customTip}
            onChangeText={setCustomTip}
            placeholder={'0.00'}
            placeholderTextColor={colors.light}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>

        <ButtonWithText
          negativeStyle
          text={`Back to\nOptions`}
          textTransform='none'
          viewStyle={{ marginRight: MARGIN }}
          onPress={() => setCustomTipFocus(false)}
        />
        <ButtonWithText
          text="Apply Tip"
          viewStyle={{ flex: 1 }}
          color={customTipValid ? colors.gold : undefined}
          onPress={customTipValid ? onSubmit : null}
        />
      </View>


    </>
  )
}
