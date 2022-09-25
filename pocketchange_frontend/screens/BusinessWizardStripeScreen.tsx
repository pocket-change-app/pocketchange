import { isNumber } from "ramda-adjunct";
import { useContext, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback } from "react-native";
import { ButtonWithText } from "../components/Cards";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";
import * as WebBrowser from 'expo-web-browser';
import { AuthContext } from "../contexts/Auth";


export default function BusinessWizardStripeScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const { businessID } = route.params

  const [result, setResult] = useState(null);
  const handleStripeFlowRedirect = async () => {

    // CALL CREATE STRIPE ACCOUNT FROM BACKEND

    let result = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(result);
  };

  return (
    <ScreenContainer>
      {/* <StatusBar
        hidden={false}
        animated
        showHideTransition='fade'
      /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : "height"}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }}

      >
        <ScrollView
          contentContainerStyle={[styles.container, { flex: 1 }]}
        >

          {/* <View style={{ flexDirection: 'row' }}> */}

          <Text style={styles.pocketTitle}>Payments</Text>

          <Text style={styles.prose}>PocketChange uses uses Stripe to get you paid quickly and keep your personal and payment information secure. Thousands of companies around the world trust Stripe to process payments for their users. Set up a Stripe account to get paid with PocketChange.</Text>

          <ButtonWithText
            text='Setup with Stripe'
            onPress={handleStripeFlowRedirect}
          />

          <Text>{result && JSON.stringify(result)}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}