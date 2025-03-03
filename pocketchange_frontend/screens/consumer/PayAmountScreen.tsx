import { MARGIN, styles } from "../../Styles";
import { View, Text, ScreenContainer } from '../../components/Themed'
import { CardHeader, ButtonWithText, BusinessCardSm, BusinessInfo, } from '../../components/Cards'
import { HorizontalLine } from "../../components/Lines";
import { KeyboardAvoidingView, Platform, SafeAreaView, TextInput } from "react-native";
import { useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { useHeaderHeight } from '@react-navigation/elements'
import { useBusinessQuery } from "../../hooks-apollo";


export default function PayAmountScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);

  const { businessID, pocketID } = route.params;

  // const { data: business, loading: businessLoading, error: businessError, refetch: refetchBusiness } = useBusinessQuery(businessID)

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

          {/* <View style={[styles.card, styles.container]}>
            <BusinessInfo businessID={businessID} wrapText />
          </View> */}

          <BusinessCardSm
            businessID={businessID}
            hideImage
            wrapText
          />

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
                    businessID: businessID,
                    pocketID: pocketID,
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