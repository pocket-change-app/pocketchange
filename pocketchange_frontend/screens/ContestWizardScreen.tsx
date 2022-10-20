import { useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { MARGIN, styles } from "../Styles";

export default function ContestWizardScreen({ route, navigation }: { route: any, navigation: any }) {

  const [contestName, setContestName] = useState('')
  const [contestDescription, setContestDescription] = useState('')


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScreenContainer>

        <View style={styles.container}>

          <View style={[styles.card, styles.textInputContainer, { marginBottom: MARGIN }]}>
            <Text style={[styles.prose]}>
              prompt
            </Text>

            <View style={styles.textInputContainer}>
              <TextInput
                // autoFocus={true}
                returnKeyType="next"
                selectionColor={colors.gold}
                autoCapitalize='sentences'
                style={styles.inputText}
                // keyboardType='numeric'
                // value={firstName}
                // onChangeText={setBusinessName}
                placeholder={'type something...'}
                placeholderTextColor={colors.subtle}
              // onSubmitEditing={() => ref_address.current.focus()}
              />
            </View>
          </View>

          <View style={[styles.card, styles.textInputContainer, { marginBottom: MARGIN }]}>
            <Text style={[styles.prose]}>
              Contest Name
            </Text>

            <View style={styles.textInputContainer}>
              <TextInput
                // autoFocus={true}
                multiline
                returnKeyType="next"
                selectionColor={colors.gold}
                autoCapitalize='words'
                style={styles.inputText}
                // keyboardType='numeric'
                value={contestName}
                onChangeText={setContestName}
                placeholder={'type something...'}
                placeholderTextColor={colors.subtle}
              // onSubmitEditing={() => ref_address.current.focus()}
              />
            </View>
          </View>

          <View style={[styles.card, styles.textInputContainer, { marginBottom: MARGIN }]}>
            <Text style={[styles.prose]}>
              Description and Rules
            </Text>

            <View style={styles.textInputContainer}>
              <TextInput
                // autoFocus={true}
                multiline
                returnKeyType="next"
                selectionColor={colors.gold}
                autoCapitalize='sentences'
                style={styles.inputText}
                // keyboardType='numeric'
                value={contestDescription}
                onChangeText={setContestDescription}
                placeholder={'type something...'}
                placeholderTextColor={colors.subtle}
              // onSubmitEditing={() => ref_address.current.focus()}
              />
            </View>
          </View>



        </View>



      </ScreenContainer>
    </KeyboardAvoidingView>
  )
}