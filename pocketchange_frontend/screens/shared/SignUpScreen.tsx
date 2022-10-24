import { StatusBar } from "react-native";
import { useRef, useState, useContext } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { ButtonWithText } from "../../components/Cards";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { MARGIN, styles } from "../../Styles";

import { useMutation } from '@apollo/react-hooks'
import UserMutations from '../../hooks-apollo/User/mutations'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../contexts/Auth';

import { isNilOrEmpty } from 'ramda-adjunct';

import DateTimePicker from '@react-native-community/datetimepicker';


export default function SignUpScreen({ route, navigation }: { route: any, navigation: any }) {

  const [firstName, setFirstname] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [homePostalCode, setHomePostalCode] = useState('')
  const [password, setPassword] = useState('')


  const [signUpError, setSignUpError] = useState('')

  const ref_inputLast = useRef();
  const ref_inputEmail = useRef();
  const ref_inputBirthDate = useRef();
  const ref_inputHomePostalCode = useRef();
  const ref_inputPass = useRef();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);

    function join(t, a, s) {
      function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
      }
      return a.map(format).join(s);
    }

    let a = [{ year: 'numeric' }, { month: '2-digit' }, { day: '2-digit' }];
    let s = join(selectedDate, a, '-');
    // console.log(s);
    setBirthDate(s)
  };

  const auth = getAuth();
  const authContext = useContext(AuthContext);

  const [useRegisterUserMutation, { loading, error }] = useMutation(
    UserMutations.registerUser, {
    onCompleted(data) { authContext.setUserGQL(data.registerUser) },
    onError(error) { console.log(error) }
  })

  if (error) console.log(error);

  if (authContext.loading || loading) return <Text>{'Submitting...'}</Text>;

  async function signUp() {



    //setFirstname("Elias")
    //setLastName("Williams")
    //setEmailAddress("elias.williams1216@gmail.com")
    //setBirthDate("1998-12-16")
    //setHomePostalCode("M4L3A2")
    //setPassword("password123")

    if (firstName === '' || lastName === '') {
      setSignUpError('First and last names are required.')
      return;
    } else if (emailAddress === '') {
      setSignUpError('Email address is required.')
      return;
    } else if (birthDate === '') {
      setSignUpError('Birth date is required.')
      return;
    } else if (homePostalCode === '') {
      setSignUpError('Postal code is required.')
      return;
    } else if (password === '') {
      setSignUpError('Password is required.')
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, emailAddress, password).then(
        (userCredential) => {
          //console.log("ABOUT TO REGISTER USER")
          useRegisterUserMutation({
            variables: {
              userID: userCredential.user.uid,
              firstName: firstName,
              lastName: lastName,
              home: homePostalCode,
              birthDate: birthDate,
              emailAddress: emailAddress,
            }
          }).then(
            res => authContext.setUserGQL(res.data),
            err => console.log(err)
          );
          //console.log("AFTER MUTUATION CALL")

        }
      );
    } catch (firebaseError) {
      if (firebaseError.code === "auth/email-already-in-use") {
        setSignUpError("This email is already registered. Please sign in.")
      } else if (firebaseError.code === "auth/weak-password") {
        setSignUpError("Please choose a stronger password.")
      } else {
        setSignUpError(firebaseError.code)
      }
      return
    }

  }

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

          {/* <TextInput
            // autoFocus={true}
            returnKeyType="next"
            selectionColor={colors.gold}
            autoCapitalize='none'
            style={styles.receipt}
            //keyboardType='email-address'
            // value={email}
            onChangeText={setBirthDate}
            placeholder={'YYYY-DD-MM'}
            placeholderTextColor={colors.subtle}
            ref={ref_inputBirthDate}
            onSubmitEditing={() => ref_inputHomePostalCode.current.focus()}
          /> */}

          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            onChange={onDateChange}
            onSubmitEditing={() => ref_inputHomePostalCode.current.focus()}
          />
        </View>



        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <Text style={styles.prose}>
            Home Postal Code
          </Text>

          <TextInput
            // autoFocus={true}
            returnKeyType="next"
            selectionColor={colors.gold}
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete="postal-code"
            maxLength={6}
            style={styles.receipt}
            //keyboardType='email-address'
            // value={email}
            onChangeText={setHomePostalCode}
            placeholder={'M5S1H2'}
            placeholderTextColor={colors.subtle}
            ref={ref_inputHomePostalCode}
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
          onPress={signUp}
        />

        <Text style={[styles.prose, { color: "red", textAlign: 'center' }]}>
          {signUpError}
        </Text>

      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}