import { isNumber } from "ramda-adjunct";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback } from "react-native";
import { ButtonWithText } from "../components/Cards";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";


export default function BusinessWizardProfileScreen({ route, navigation }: { route: any, navigation: any }) {

  const [busName, setBusName] = useState('')
  const [busBio, setBusBio] = useState('')
  const [address, setAddress] = useState('')
  const [addressLineTwo, setAddressLineTwo] = useState('')
  const [postalCode, setPostalCode] = useState('')

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

          {/* <View style={{ flexDirection: 'row' }}> */}

          <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              Business Name
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.receipt}
              // keyboardType='numeric'
              // value={firstName}
              onChangeText={setBusName}
              placeholder={'Your Business'}
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
              Address
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.receipt}
              keyboardType='numbers-and-punctuation'
              // value={lastName}
              onChangeText={setAddress}
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
                Postal Code
              </Text>

              <TextInput
                // autoFocus={true}
                // returnKeyType='default'
                selectionColor={colors.gold}
                autoCapitalize='characters'
                style={styles.receipt}
                // keyboardType='number-pad'
                value={postalCode}
                maxLength={6}
                onChangeText={setPostalCode}
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
              onChangeText={setAddress}
              placeholder={'+1 (416) 123-4567'}
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
                name: busName,
                // phoneNumber: busPhone,
                address: address,
                // pocket: "Leslieville",
                // imageURL: require("./assets/images/avling.jpg"),
                bio: busBio,
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