import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { user } from "../dummy";
import { MARGIN, styles } from "../Styles";
//import DateTimePicker from '@react-native-community/datetimepicker';
import { ButtonWithText } from "../components/Cards";

export default function EditProfileScreen({ route, navigation }: { route: any, navigation: any }) {

  const [firstName, setFirstName] = useState(user.name.first)
  const [lastName, setLastName] = useState(user.name.last)
  const [birthday, setBirthday] = useState(new Date(user.dateOfBirth))
  const [gender, setGender] = useState(user.gender)
  const [zipCode, setZipCode] = useState(user.address.zipCode)

  const ref_inputLast = useRef();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={[{ flexDirection: 'row' }]}>
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
              defaultValue={firstName}
              // value={firstName}
              onChangeText={setFirstName}
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
              // editable={isTorontoResident}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.receipt}
              // keyboardType='numeric'
              defaultValue={lastName}
              // value={lastName}
              onChangeText={setLastName}
              placeholder={'Doe'}
              placeholderTextColor={colors.subtle}
              ref={ref_inputLast}
            // onSubmitEditing={() => ref_inputEmail.current.focus()}
            />
          </View>
        </View>

        <View style={[{ flexDirection: 'row', marginBottom: MARGIN }]}>
          <View style={[styles.signUpInputText, { marginRight: MARGIN }]}>
            <Text style={styles.prose}>
              Birthday
            </Text>
            {
            //<DateTimePicker
              //style={{ width: 90 }}
              //value={birthday}
              //display='compact'
              //onChange={null}
            
              // autoFocus={true}
              // returnKeyType="next"
              // selectionColor={colors.gold}
              // autoCapitalize='words'
              // style={styles.receipt}
              // keyboardType='numeric'
              // defaultValue={firstName}
              // value={firstName}
              // onChangeText={setFirstName}
              // placeholder={'Jane'}
              // placeholderTextColor={colors.subtle}
              // onSubmitEditing={() => ref_inputLast.current.focus()}
            ///>
          }
          </View>

          <View style={[styles.signUpInputText, { flex: 1 }]}>
            <Text style={styles.prose}>
              Gender
            </Text>

            <Picker
              mode='dropdown'
              itemStyle={styles.receipt}
              selectedValue={gender}
              onValueChange={setGender}>
              <Picker.Item label="male" value="Male" />
              <Picker.Item label="female" value="Female" />
              <Picker.Item label="other" value="Other" />
            </Picker>
          </View>
        </View>

        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <Text style={styles.prose}>
            Toronto Zip Code
          </Text>

          <TextInput
            // autoFocus={true}
            returnKeyType="next"
            selectionColor={colors.gold}
            autoCapitalize='characters'
            style={styles.receipt}
            keyboardType='decimal-pad'
            defaultValue={zipCode}
            // value={firstName}
            onChangeText={setZipCode}
            placeholder={'XXXXXX'}
            placeholderTextColor={colors.subtle}
          // onSubmitEditing={() => ref_inputLast.current.focus()}
          />
        </View>

        <ButtonWithText
          text='Save'
          color={colors.gold}
        />

      </View>
    </ScreenContainer>
  )
}