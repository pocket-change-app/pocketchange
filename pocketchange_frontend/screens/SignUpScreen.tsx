import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { ButtonWithText } from "../components/Cards";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";


export default function SignUpScreen({ route, navigation }: { route: any, navigation: any }) {

  const [firstName, setFirstname] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const ref_inputLast = useRef();
  const ref_inputEmail = useRef();
  const ref_inputPass = useRef();

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : "height"}
        keyboardVerticalOffset={100}
        style={[styles.container, { flex: 1, justifyContent: 'center' }]}
      >

        <View style={{ flexDirection: 'row' }}>

          <View style={[styles.signUpInputText, { flex: 2, marginBottom: MARGIN, marginRight: MARGIN }]}>
            <Text style={styles.prose}>
              First Name
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.receipt}
              // keyboardType='numeric'
              // value={firstName}
              onChangeText={setFirstname}
              placeholder={'Jane'}
              placeholderTextColor={colors.subtle}
              onSubmitEditing={() => ref_inputLast.current.focus()}
            />
          </View>

          <View style={[styles.signUpInputText, { flex: 3, marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              Last Name
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.receipt}
              // keyboardType='numeric'
              // value={lastName}
              onChangeText={setLastName}
              placeholder={'Doe'}
              placeholderTextColor={colors.subtle}
              ref={ref_inputLast}
              onSubmitEditing={() => ref_inputEmail.current.focus()}
            />
          </View>

        </View>

        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <Text style={styles.prose}>
            Email
          </Text>

          <TextInput
            // autoFocus={true}
            returnKeyType="next"
            selectionColor={colors.gold}
            autoCapitalize='none'
            style={styles.receipt}
            keyboardType='email-address'
            // value={email}
            onChangeText={setEmail}
            placeholder={'buy.local@aol.com'}
            placeholderTextColor={colors.subtle}
            ref={ref_inputEmail}
            onSubmitEditing={() => ref_inputPass.current.focus()}
          />
        </View>

        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <Text style={styles.prose}>
            Create Password
          </Text>

          <TextInput
            // autoFocus={true}
            returnKeyType='done'
            selectionColor={colors.gold}
            secureTextEntry
            autoCapitalize='none'
            style={styles.receipt}
            // keyboardType='numeric'
            // value={password}
            onChangeText={setPassword}
            placeholder={'1234'}
            placeholderTextColor={colors.subtle}
            ref={ref_inputPass}
          />
        </View>

        <ButtonWithText
          text='Create Account'
          color={
            (email != '' && password != '') ? colors.gold : colors.subtle
          }
          onPress={null}
        />

      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}