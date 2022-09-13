import { isNumber } from "ramda-adjunct";
import { useContext, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback } from "react-native";
import { ButtonWithText } from "../components/Cards";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";
//import * as WebBrowser from 'expo-web-browser';
import { AuthContext } from "../contexts/Auth";


export default function BusinessWizardStripeScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const { business } = route.params

  const [result, setResult] = useState(null);
  const handleStripeFlowRedirect = async () => {
    //let result = await WebBrowser.openBrowserAsync('https://expo.dev');
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

      

          <ButtonWithText
            text='Setup with Stripe'
            // color={
            //   (emailAddress != '' && password != '') ? colors.gold : colors.subtle
            // }
            onPress={handleStripeFlowRedirect}
          />

          <Text>{result && JSON.stringify(result)}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}