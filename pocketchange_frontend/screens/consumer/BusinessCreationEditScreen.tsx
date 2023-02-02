import { isNumber } from "ramda-adjunct";
import { useContext, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback } from "react-native";
import { ButtonWithText } from "../../components/Cards";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { MARGIN, styles } from "../../Styles";
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation } from '@apollo/react-hooks'
import BusinessMutations from '../../hooks-apollo/Business/mutations'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
//import * as mime from 'react-native-mime-types';




export default function ({ route, navigation }: { route: any, navigation: any }) {

  const { pocketID } = route.params

  const authContext = useContext(AuthContext);

  const storage = getStorage();


  const storageRef = ref(storage);
  const [uploadingImage, setUploadingImage] = useState(false);


  const [businessName, setBusinessName] = useState('')
  const [businessBio, setBusinessBio] = useState('')
  const [businessStreetAddress, setBusinessStreetAddress] = useState('')
  const [addressLineTwo, setAddressLineTwo] = useState('')
  const [businessPostalCode, setBusinessPostalCode] = useState('')
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('')
  const [website, setWebsite] = useState('')

  const [open, setOpen] = useState(false);
  const [businessType, setBusinessType] = useState(null);
  //console.log(businessType)
  const [items, setItems] = useState([
    { label: 'Restaurant', value: 'restaurant' },
    //{label: 'Cafe', value: 'cafe', parent: 'restaurant'},
    //{label: 'Indian', value: 'indian', parent: 'restaurant'},
    { label: 'Grocery', value: 'grocery' },

    { label: 'Retail', value: 'retail' },
    //{label: 'Clothing', value: 'clothing', parent: 'retail'},
    //{label: 'Toys', value: 'toys', parent: 'retail'},
  ]);

  // const ref_about = useRef();
  const ref_address = useRef('addy');
  const ref_postalCode = useRef('posty');
  const ref_phone = useRef('phony');
  const ref_website = useRef('webster');

  const [useCreateBusinessMutation, { loading, error }] = useMutation(
    BusinessMutations.createBusiness, {
    onCompleted(data) {
      // const businessImageRef = ref(storage, "Business/".concat(data.createBusiness.businessID, "/businessProfile.jpg"));
      // uploadBytes(businessImageRef, blob).then((snapshot) => {
      //   console.log('Uploaded business profile image!');
      // });
      navigation.navigate('BusinessWizardUploadImage', { businessID: data.createBusiness.businessID });
    },
    onError(error) { console.log(JSON.stringify(error, null, 2)) }
  })


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
          <Text style={styles.pocketTitle}>Edit Business Info</Text>

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
              style={styles.settingEditText}
              // keyboardType='numeric'
              // value={firstName}
              onChangeText={setBusinessName}
              placeholder={'Honest Bean Cafe'}
              placeholderTextColor={colors.subtle}
              onSubmitEditing={() => ref_address.current.focus()}
            />
          </View>

          <DropDownPicker
            style={styles.card}
            dropDownContainerStyle={styles.card}
            textStyle={styles.settingEditText}
            placeholder="Business Type"
            open={open}
            value={businessType}
            items={items}
            setOpen={setOpen}
            setValue={setBusinessType}
            setItems={setItems}
          />

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
              returnKeyType='next'
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.settingEditText}
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
                style={styles.settingEditText}
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
                returnKeyType='next'
                selectionColor={colors.gold}
                autoCapitalize='characters'
                style={styles.settingEditText}
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
              style={styles.settingEditText}
              keyboardType='number-pad'
              // value={lastName}
              maxLength={10}
              onChangeText={setBusinessPhoneNumber}
              placeholder={'4161234567'}
              placeholderTextColor={colors.subtle}
              ref={ref_phone}
              onSubmitEditing={() => ref_website.current.focus()}
            />
          </View>

          <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              Website
            </Text>

            <TextInput
              // autoFocus={true}
              returnKeyType="next"
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.settingEditText}
              keyboardType='default'
              // value={lastName}
              onChangeText={setWebsite}
              placeholder={'yourwebsite.com'}
              placeholderTextColor={colors.subtle}
              ref={ref_website}
            //onSubmitEditing={() => ref_postalCode.current.focus()}
            />
          </View>



          <ButtonWithText
            text='Next'
            // color={
            //   (emailAddress != '' && password != '') ? colors.gold : colors.subtle
            // }
            onPress={() => navigation.navigate('BusinessCreationStripe', { businessID: "1b" })
              // TODO: uncoment below
              // useCreateBusinessMutation({
              // variables: {
              //   userID: authContext.userGQL.userID, 
              //   businessName: businessName, 
              //   phoneNumber: businessPhoneNumber, 
              //   website: website, 
              //   businessType: businessType, 
              //   pocketID: pocketID
              // }})
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}