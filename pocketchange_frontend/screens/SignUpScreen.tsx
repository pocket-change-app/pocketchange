import { StatusBar } from "react-native";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { ButtonWithText } from "../components/Cards";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";

import { useMutation } from '@apollo/react-hooks'
import UserMutations from '../hooks-apollo/User/mutations'


export default function SignUpScreen({ route, navigation }: { route: any, navigation: any }) {

  const [firstName, setFirstname] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [homeNeighbourhood, setHomeNeighbourhood] = useState('')
  const [password, setPassword] = useState('')

  const ref_inputLast = useRef();
  const ref_inputEmail = useRef();
  const ref_inputBirthDate = useRef();
  const ref_inputHomeNeighbourhood = useRef();
  const ref_inputPass = useRef();

  const [useRegisterUserMutation, {loading, data, error}] = useMutation(UserMutations.registerUser)

  if (loading) return <Text>{'Submitting...'}</Text>;
  if (error) return <Text>Submission Error!{console.log(JSON.stringify(error, null, 2))}</Text>;

  return (
    <ScreenContainer>
      <StatusBar
        hidden={false}
        animated
        showHideTransition='fade'
      />
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
            Email Address
          </Text>

          <TextInput
            // autoFocus={true}
            returnKeyType="next"
            selectionColor={colors.gold}
            autoCapitalize='none'
            style={styles.receipt}
            keyboardType='email-address'
            // value={email}
            onChangeText={setEmailAddress}
            placeholder={'buy.local@gmail.com'}
            placeholderTextColor={colors.subtle}
            ref={ref_inputEmail}
            onSubmitEditing={() => ref_inputBirthDate.current.focus()}
          />
        </View>

        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <Text style={styles.prose}>
            Birth Date
          </Text>

          <TextInput
            // autoFocus={true}
            returnKeyType="next"
            selectionColor={colors.gold}
            autoCapitalize='none'
            style={styles.receipt}
            //keyboardType='email-address'
            // value={email}
            onChangeText={setBirthDate}
            placeholder={'December 25th, 1'}
            placeholderTextColor={colors.subtle}
            ref={ref_inputBirthDate}
            onSubmitEditing={() => ref_inputHomeNeighbourhood.current.focus()}
          />
        </View>

        

        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <Text style={styles.prose}>
            Home Neighbourhood
          </Text>

          <TextInput
            // autoFocus={true}
            returnKeyType="next"
            selectionColor={colors.gold}
            autoCapitalize='none'
            style={styles.receipt}
            //keyboardType='email-address'
            // value={email}
            onChangeText={setHomeNeighbourhood}
            placeholder={'Riverside'}
            placeholderTextColor={colors.subtle}
            ref={ref_inputHomeNeighbourhood}
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
            (emailAddress != '' && password != '') ? colors.gold : colors.subtle
          }
          onPress={e => {
              e.preventDefault();
              const fullName = firstName.concat(" ", lastName);
              useRegisterUserMutation({
                variables: {
                    username: emailAddress, // temporary fix, need ot remove username field from backend
                    name: fullName, 
                    home: homeNeighbourhood, 
                    birthDate: birthDate, 
                    emailAddress: emailAddress, 
                    password: password
                }});
            }}
        />

      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}