import { MARGIN, styles } from "../../Styles";
import { View, Text, ScreenContainer } from '../../components/Themed'
import { ButtonWithText } from '../../components/Cards'
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView } from "react-native";
import { useContext, useState } from "react";
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { HorizontalLine } from "../../components/Lines";

export default function PayTipScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const { business, pocket, amount } = route.params;

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
        onPress={() => navigation.navigate('PaySummary', {
          business: business,
          pocket: pocket,
          amount: parseFloat(amount).toFixed(2),
          tip: tip.toFixed(2),
        })
        }
      />
    )

    // onPress={() => navigation.navigate('PaySummary', {
    //   business: business,
    //   amount: parseFloat(amount).toFixed(2),
    //   tip: tipAmount.toFixed(2),
    // })}

  }

  return (

    <>

      <SafeAreaView style={{ flex: 1 }}>

        <HorizontalLine />

        <View style={[styles.container, { flex: 1 }]}>

          <View>

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


            {/* SUBTOTAL */}

            <View style={[styles.card, styles.container]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.paymentSummaryText, { textAlign: 'left' }]}>Subtotal</Text>
                <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>${amount}</Text>
              </View>
            </View>

          </View>




          <View style={[{ flex: 1, justifyContent: 'center' }]}>

            {/* TIP OPTIONS */}

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
                  onPress={null} //TODO: make custom tip modal
                />

                <ButtonWithText
                  negativeStyle
                  text='No Tip'
                  textTransform='none'
                  textStyle={styles.tipButtonText}
                  color={colors.gold}
                  onPress={() => navigation.navigate('PaySummary', {
                    business: business,
                    pocket: pocket,
                    amount: parseFloat(amount).toFixed(2),
                    tip: '0.00',
                  })}
                />

              </View>

            </View>

          </View>

          <View style={styles.container}>

          </View>

        </View>

      </SafeAreaView>

    </>
  )
}