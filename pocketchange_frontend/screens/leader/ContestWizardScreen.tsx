import DateTimePicker from '@react-native-community/datetimepicker';
import { useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableWithoutFeedback } from "react-native";
import { ButtonWithText } from '../../components/Cards';
import { ScreenContainer, Text, View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { BUTTON_HEIGHT, MARGIN, styles } from "../../Styles";

export default function ContestWizardScreen({ route, navigation }: { route: any, navigation: any }) {

  const [contestName, setContestName] = useState('')
  const [description, setDescription] = useState('')
  const [prizeAmount, setPrizeAmount] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const today = new Date()

  // const ref_contestName = useRef();
  const ref_description = useRef();
  const ref_prizeAmount = useRef();

  const fieldsFilledAppropriately = (
    contestName !== '' &&
    description !== '' &&
    prizeAmount !== '' &&
    today < startDate &&
    startDate < endDate
  )

  const formatPrizeAmount = () => {

    if (prizeAmount == '') return

    const formattedAmt = parseFloat(prizeAmount).toFixed(2)
    setPrizeAmount(formattedAmt)
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    > 
      <ScreenContainer>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
          style={{ flex: 1 }}
        >

          <ScrollView>

            <View style={[styles.container, { flex: 1 }]}>

              <View style={[styles.card, styles.inputFieldContainer, { marginBottom: MARGIN }]}>
                <Text style={[styles.prose]}>
                  Contest Name
                </Text>

                <View style={[styles.textInputContainer, { justifyContent: 'center' }]}>
                  <TextInput
                    // autoFocus
                    // multiline
                    returnKeyType="next"
                    selectionColor={colors.gold}
                    autoCapitalize='words'
                    style={[styles.inputText, { textAlign: 'center' }]}
                    // keyboardType='numeric'
                    value={contestName}
                    onChangeText={setContestName}
                    placeholder={'Name Goes Here (/^-^)/'}
                    placeholderTextColor={colors.subtle}
                    onSubmitEditing={() => ref_description.current.focus()}
                  />
                </View>
              </View>

              <View style={[styles.card, styles.inputFieldContainer, { marginBottom: MARGIN }]}>
                <Text style={[styles.prose]}>
                  Description
                </Text>

                <View style={styles.textInputContainer}>
                  <TextInput
                    // autoFocus={true}
                    multiline
                    // returnKeyType="next"
                    selectionColor={colors.gold}
                    autoCapitalize='sentences'
                    style={styles.inputText}
                    // keyboardType='numeric'
                    value={description}
                    onChangeText={setDescription}
                    placeholder={'type something...'}
                    placeholderTextColor={colors.subtle}
                    ref={ref_description}
                  // onSubmitEditing={() => ref_prizeAmount.current.focus()}
                  />
                </View>
              </View>

              <View style={[styles.card, styles.inputFieldContainer, { marginBottom: MARGIN }]}>
                <Text style={[styles.prose]}>
                  Prize Amount
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputNumber}>$</Text>
                  <TextInput
                    // autoFocus={true}
                    returnKeyType='next'
                    selectionColor={colors.gold}
                    autoCapitalize='sentences'
                    style={styles.inputNumber}
                    keyboardType='numeric'
                    value={prizeAmount}
                    onChangeText={setPrizeAmount}
                    placeholder={'3.2B'}
                    placeholderTextColor={colors.subtle}
                    ref={ref_prizeAmount}
                    // onSubmitEditing={() => ref_.current.focus()}
                    onEndEditing={formatPrizeAmount}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.card, styles.inputFieldContainer, { flex: 1, marginRight: MARGIN }]}>
                  <Text style={[styles.prose]}>
                    Start Date
                  </Text>

                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode="date"
                    onChange={(event, date) => setStartDate(date)}
                  // onSubmitEditing={() => ref_inputHomePostalCode.current.focus()}
                  />
                </View>

                <View style={[styles.card, styles.inputFieldContainer, { flex: 1 }]}>
                  <Text style={[styles.prose]}>
                    End Date
                  </Text>

                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode="date"
                    onChange={(event, date) => setEndDate(date)}
                  // onSubmitEditing={() => ref_inputHomePostalCode.current.focus()}
                  />
                </View>
              </View>

            </View>

          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.floatingButtonContainer}>
            <ButtonWithText
              text='Next'
              onPress={() => {
                if (fieldsFilledAppropriately) navigation.navigate('ContestWizardSummary', {
                  contest: {
                    contestName,
                    description,
                    prizeAmount,
                    startDate,
                    endDate
                  }
                })
              }}
              color={fieldsFilledAppropriately ?
                (
                  colors.gold
                ) : (
                  colors.subtle
                )
              }
            />
          </View>


        </ScreenContainer>

    </TouchableWithoutFeedback>
  )
}