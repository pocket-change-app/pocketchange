import { isNumber } from "ramda-adjunct";
import { useContext, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback } from "react-native";
import { ButtonWithText } from "../components/Cards";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { AuthContext } from "../contexts/Auth";
import { MARGIN, styles } from "../Styles";


export default function BusinessWizardProfileScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const [businessName, setBusinessName] = useState('')
  const [businessBio, setBusinessBio] = useState('')
  const [businessStreetAddress, setBusinessStreetAddress] = useState('')
  const [addressLineTwo, setAddressLineTwo] = useState('')
  const [businessPostalCode, setBusinessPostalCode] = useState('')
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('')

  const ref_about = useRef();
  const ref_address = useRef();
  const ref_postalCode = useRef();
  const ref_phone = useRef();


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
          <Text style={styles.pocketTitle}>Create Business Profile</Text>

          {/* <View style={{ flexDirection: 'row' }}> */}

          <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={[styles.prose]}>
              Business Display Name
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.receipt}
              // keyboardType='numeric'
              // value={firstName}
              onChangeText={setBusinessName}
              placeholder={'Honest Bean Cafe'}
              placeholderTextColor={colors.subtle}
              onSubmitEditing={() => ref_address.current.focus()}
            />
          </View>

          {/* <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              About {!busName ? 'your business' : busName}:
            </Text>

            <TextInput

              multiline
              numberOfLines={2}
              // autoFocus={true}
              // returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='sentences'
              style={styles.receipt}
              // keyboardType='numeric'
              // value={firstName}
              onChangeText={setBusBio}
              placeholder={'We sell cookies!'}
              placeholderTextColor={colors.subtle}
              ref={ref_about}
            // onSubmitEditing={() => ref_inputLast.current.focus()}
            />
          </View> */}

          <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              Street Address
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.receipt}
              keyboardType='numbers-and-punctuation'
              // value={lastName}
              onChangeText={setBusinessStreetAddress}
              placeholder={'000 Queen St E'}
              placeholderTextColor={colors.subtle}
              ref={ref_address}
              onSubmitEditing={() => ref_postalCode.current.focus()}
            />
          </View>

          <View style={{ flexDirection: 'row' }}>

            <View style={[styles.signUpInputText, { borderWidth: 0, backgroundColor: 'transparent', marginRight: MARGIN, marginBottom: MARGIN }]}>
              <Text style={styles.prose}>
                {' '}
              </Text>

              <Text
                selectionColor={colors.gold}
                style={styles.receipt}
              >
                Toronto, ON
              </Text>
            </View>

            <View style={[styles.signUpInputText, { flex: 1, marginBottom: MARGIN }]}>
              <Text style={styles.prose}>
                Postal Code (no space)
              </Text>

              <TextInput
                // autoFocus={true}
                // returnKeyType='default'
                selectionColor={colors.gold}
                autoCapitalize='characters'
                style={styles.receipt}
                // keyboardType='number-pad'
                // value={businessPostalCode}
                maxLength={6}
                onChangeText={setBusinessPostalCode}
                placeholder={'ABC123'}
                placeholderTextColor={colors.subtle}
                ref={ref_postalCode}
                onSubmitEditing={() => ref_phone.current.focus()}
              />
            </View>

          </View>

          <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              Phone Number
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.receipt}
              keyboardType='number-pad'
              // value={lastName}
              maxLength={10}
              onChangeText={setBusinessPhoneNumber}
              placeholder={'4161234567'}
              placeholderTextColor={colors.subtle}
              ref={ref_phone}
            // onSubmitEditing={() => ref_phone.current.focus()}
            />
          </View>



          <ButtonWithText
            text='Next'
            // color={
            //   (emailAddress != '' && password != '') ? colors.gold : colors.subtle
            // }
            onPress={() => navigation.navigate('BusinessWizardStripe', {
              business: {
                businessName: businessName,
                phoneNumber: businessPhoneNumber,
                address: businessStreetAddress,
                pocket: "Leslieville",
                // imageURL: require("./assets/images/avling.jpg"),
                bio: businessBio,
                // hours: hmm...
                // people: [
                //   {
                //     name: 'Max',
                //     position: 'Owner',
                //     imageURL: require('./assets/images/max.png')
                //   }
                // ]
              },
            })}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}