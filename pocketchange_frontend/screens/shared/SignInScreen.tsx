import { ActivityIndicator, StatusBar } from "react-native";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { ButtonWithText } from "../../components/Cards";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { BUTTON_HEIGHT, MARGIN, styles } from "../../Styles";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function SignInScreen({ route, navigation }: { route: any, navigation: any }) {

    const authContext = useContext(AuthContext); 

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const [signInError, setSignInError] = useState('')
    const [signInLoading, setSignInLoading] = useState(false)


    const ref_inputEmail = useRef();
    const ref_inputPass = useRef();

    const auth = getAuth();

    async function signIn() {
        setSignInLoading(true);
        if (emailAddress === '' || password === '') {
        setSignInError('Email and password are mandatory.')
        setSignInLoading(false);
        return;
        }
        try {
          await signInWithEmailAndPassword(auth, emailAddress, password);
        } catch (error) {
          setSignInError(error);
          console.log(error)
          setSignInLoading(false);
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

        <View style={[styles.signUpInputText, {marginBottom: MARGIN}]}>
            
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
            onChangeText={setEmailAddress}
            placeholder={'buy.local@gmail.com'}
            placeholderTextColor={colors.subtle}
            ref={ref_inputEmail}
            onSubmitEditing={() => ref_inputPass.current.focus()}
          />
          </View>

        <View style={[styles.signUpInputText, {marginBottom: MARGIN}]}>
            <Text style={styles.prose}>
              Password
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


        {(signInLoading) ? (
          <View style={{ height: BUTTON_HEIGHT }}>
            <ActivityIndicator size="small" color={colors.subtle} style={{ margin: 10 }} />
          </View>
        ) : (
          <ButtonWithText
            text='Sign In'
            color={
              (emailAddress != '' && password != '') ? colors.gold : colors.subtle
            }
            onPress={signIn}
          />
          )
        }

        <Text style={[styles.prose, {color:"red"}]}>
          {signInError.code}
        </Text>

      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}