import { isNumber } from "ramda-adjunct";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback } from "react-native";
import { ButtonWithText } from "../components/Cards";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";


export default function BusinessWizardStripeScreen({ route, navigation }: { route: any, navigation: any }) {

  const { business } = route.params

  const [routingNumber, setRoutingNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  // const [address, setAddress] = useState('')
  // const [addressLineTwo, setAddressLineTwo] = useState('')
  // const [zipCode, setZipCode] = useState('')

  const ref_accountNumber = useRef();
  // const ref_address = useRef();
  // const ref_zipCode = useRef();


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

          <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              Routing Number
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              // autoCapitalize='words'
              style={styles.receipt}
              keyboardType='number-pad'
              // value={firstName}
              onChangeText={setRoutingNumber}
              placeholder={'12345678'}
              placeholderTextColor={colors.subtle}
              onSubmitEditing={() => ref_accountNumber.current.focus()}
            />
          </View>

          <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              Account Number
            </Text>

            <TextInput

              multiline
              numberOfLines={2}
              // autoFocus={true}
              // returnKeyType="next"
              selectionColor={colors.gold}
              // autoCapitalize='sentences'
              style={styles.receipt}
              keyboardType='number-pad'
              // value={firstName}
              onChangeText={setAccountNumber}
              placeholder={'123456789'}
              placeholderTextColor={colors.subtle}
              ref={ref_accountNumber}
            // onSubmitEditing={() => ref_inputLast.current.focus()}
            />
          </View>



          <ButtonWithText
            text='Create PocketChange Business'
            // color={
            //   (emailAddress != '' && password != '') ? colors.gold : colors.subtle
            // }
            onPress={null}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}