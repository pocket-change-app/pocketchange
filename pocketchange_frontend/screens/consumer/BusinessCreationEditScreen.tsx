import { useContext, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import { ButtonWithText } from "../../components/Cards";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { MARGIN, styles } from "../../Styles";
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation } from '@apollo/react-hooks'
import BusinessMutations from '../../hooks-apollo/Business/mutations'
import { getStorage, ref } from "firebase/storage";
import Constants from "expo-constants";
//import * as mime from 'react-native-mime-types';


type AddressComponent = {
  long_name: string,
  short_name: string,
  types: string[],
}

type Place = {
  name: string,
  formatted_address: string,
  address_components: AddressComponent[],
  international_phone_number: string,
  website: string,
  // fill this type out with additional fields as necessary
}

type PlaceDetailsStatus = 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR';

type PlaceDetailsResponse = {
  html_attributions: string[],
  result: Place,
  status: PlaceDetailsStatus,
  info_messages: string[],
}


export default function ({ route, navigation }: { route: any, navigation: any }) {

  const { pocketID, place_id } = route.params

  // const authContext = useContext(AuthContext);

  // const storage = getStorage();

  // const storageRef = ref(storage);
  // const [uploadingImage, setUploadingImage] = useState(false);

  // const [placeDetailsResponse, setPlaceDetailsResponse] = useState<PlaceDetailsResponse>()


  const [businessName, setBusinessName] = useState<string>('')
  // const [businessBio, setBusinessBio] = useState('')
  const [businessAddress, setBusinessAddress] = useState<string>('')
  // const [addressLineTwo, setAddressLineTwo] = useState('')
  const [businessPostalCode, setBusinessPostalCode] = useState<string>('')
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState<string>('')
  const [businessWebsite, setBusinessWebsite] = useState<string>('')

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [businessType, setBusinessType] = useState(null);
  //console.log(businessType)
  const businessTypes = [
    { label: 'Restaurant', value: 'restaurant' },
    //{label: 'Cafe', value: 'cafe', parent: 'restaurant'},
    //{label: 'Indian', value: 'indian', parent: 'restaurant'},
    { label: 'Grocery', value: 'grocery' },
    { label: 'Retail', value: 'retail' },
    //{label: 'Clothing', value: 'clothing', parent: 'retail'},
    //{label: 'Toys', value: 'toys', parent: 'retail'},
  ];

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

  const GOOGLE_MAPS_API_KEY = Constants.manifest?.extra?.googleMapsApiKey;
  const placeDetailsFields = 'name,formatted_address,address_components,international_phone_number,website';
  const GOOGLE_PLACES_DETAILS_API_URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${placeDetailsFields}&key=${GOOGLE_MAPS_API_KEY}`;

  // init fields with google place details
  useEffect(() => {
    if (!place_id) return;
    const initFieldsWithPlacesDetail = async () => {
      fetch(GOOGLE_PLACES_DETAILS_API_URL, {
        method: 'get'
      }).then((response) => {
        return response.json();
      }).then((response: PlaceDetailsResponse) => {
        console.log("place details:\n", JSON.stringify(response.result, null, '  '))

        const place = response.result;
        setBusinessName(place.name);

        // let address = '';
        // let lastComponentName = '';
        // for (let i in place.address_components) {
        //   const addressComponent = place.address_components[i]
        //   if (addressComponent.types.includes('country')) break;
        //   lastComponentName = addressComponent.long_name
        //   address += (lastComponentName + ', ')
        // }
        // address = address.slice(0, -2)
        setBusinessAddress(place.formatted_address);

        const postalCode = place.address_components.find(component => component.types.includes('postal_code'))?.long_name;
        console.log(postalCode);
        setBusinessPostalCode(postalCode ? postalCode : '')

        setBusinessPhoneNumber(place.international_phone_number)
        setBusinessWebsite(place.website)

      }).catch((err) => {
        console.log(err)
      });
    }
    initFieldsWithPlacesDetail();
  }, [])

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
              value={businessName}
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
            open={dropdownOpen}
            value={businessType}
            items={businessTypes}
            setOpen={setDropdownOpen}
            setValue={setBusinessType}
          // setItems={setItems}
          />

          <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
            <Text style={styles.prose}>
              Street Address
            </Text>

            <TextInput
              // autoFocus={true}
              multiline
              returnKeyType='next'
              selectionColor={colors.gold}
              autoCapitalize='words'
              style={styles.settingEditText}
              keyboardType='numbers-and-punctuation'
              value={businessAddress}
              onChangeText={setBusinessAddress}
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

            <View style={[styles.card, styles.signUpInputText, { flex: 1 }]}>
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
                value={businessPostalCode}
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
              value={businessPhoneNumber}
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
              value={businessWebsite}
              onChangeText={setBusinessWebsite}
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