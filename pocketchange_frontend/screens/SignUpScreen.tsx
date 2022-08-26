import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";


export default function SignUpScreen({ route, navigation }: { route: any, navigation: any }) {

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : "height"}
        keyboardVerticalOffset={100}
        style={[styles.container, { flex: 1, justifyContent: 'center' }]}
      >

        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <Text style={styles.prose}>
            Email
          </Text>

          <TextInput
            // autoFocus={true}
            autoCapitalize='none'
            style={styles.receipt}
            // keyboardType='numeric'
            // value={}
            // onChangeText={onChangeAmount}
            placeholder={'buy.local@aol.com'}
            placeholderTextColor={colors.subtle}
          />
        </View>

        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <Text style={styles.prose}>
            Create password
          </Text>

          <TextInput
            // autoFocus={true}
            secureTextEntry
            autoCapitalize='none'
            style={styles.receipt}
            // keyboardType='numeric'
            // value={}
            // onChangeText={onChangeAmount}
            placeholder={'1234'}
            placeholderTextColor={colors.subtle}
          />
        </View>

      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}