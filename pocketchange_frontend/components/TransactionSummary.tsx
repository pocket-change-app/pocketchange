import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";
import { Text, View } from "./Themed";



export default function TransactionSummary({ amount, tip }: { amount: string, tip: string }) {

  const amountNum = parseFloat(amount)
  const tipNum = parseFloat(tip)
  // const changeToUse = (useChange ? 2.63 : 0)
  // const fee = ((amountNum + tipNum) * FEE_RATE)
  const total = amountNum + tipNum // (amountNum + tipNum + fee)

  return (
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
  )
}