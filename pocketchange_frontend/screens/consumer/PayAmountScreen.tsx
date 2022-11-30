import { MARGIN, styles } from "../../Styles";
import { View, Text, ScreenContainer } from '../../components/Themed'
import { CardHeader, ButtonWithText, } from '../../components/Cards'
import { HorizontalLine } from "../../components/Lines";
import { KeyboardAvoidingView, Platform, SafeAreaView, TextInput } from "react-native";
import { useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { useHeaderHeight } from '@react-navigation/elements'


export default function PayAmountScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);

  const { business, pocket } = route.params;

  const [amount, setAmount] = useState('')

  const amountValid = (parseFloat(amount) > 0)

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={useHeaderHeight()}
      style={{ flex: 1 }}
    >
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

          <View style={{ flex: 1, justifyContent: 'center' }}>

            <View style={styles.card}>
              <View style={styles.inputContainer}>
                <Text style={styles.paymentFocusText}>$</Text>
                <TextInput
                  autoFocus
                  style={styles.paymentFocusText}
                  keyboardType='numeric'
                  value={amount}
                  onChangeText={setAmount}
                  placeholder={'0.00'}
                  placeholderTextColor={colors.light}
                />
              </View>
            </View>

            <ButtonWithText
              text={'Next'}
              color={amountValid ? colors.gold : undefined}
              onPress={() => {
                if (amountValid) {
                  navigation.navigate("PayTip", {
                    // navigation: navigation,
                    business: business,
                    pocket: pocket,
                    amount: parseFloat(amount).toFixed(2),
                  })
                }
              }}
            />


          </View>
        </View>

      </SafeAreaView>

    </KeyboardAvoidingView>

  )
}