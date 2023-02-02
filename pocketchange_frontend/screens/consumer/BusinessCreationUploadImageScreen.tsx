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


export default function ({ route, navigation }: { route: any, navigation: any }) {

  const { pocketID, businessID } = route.params

  const authContext = useContext(AuthContext);

  const storage = getStorage();

  const storageRef = ref(storage);
  const [pickedImagePath, setPickedImagePath] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false);


  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
      console.log("RES", result)
      await uploadImageAsync(result.uri)
      navigation.navigate('BusinessWizardStripe', { businessID: businessID });
    }
  }

  async function uploadImageAsync(uri: any) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const businessImageRef = ref(storage, "Business/".concat(businessID, "/businessProfile.jpg"));
    uploadBytes(businessImageRef, blob).then((snapshot) => {
      console.log('Uploaded business profile image!');
    });
    blob.close();
  }

  return (
    <ScreenContainer>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : "height"}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.container, { flex: 1 }]}>

          {/* <View style={{ flexDirection: 'row' }}> */}

          <Text style={styles.pocketTitle}>Business Profile Image</Text>

          <Text style={[styles.prose, { marginBottom: MARGIN }]}>Please choose a photo for your public business page.</Text>

          <View style={{ marginBottom: MARGIN }}>
            <ButtonWithText
              color={colors.blue}
              text={'Choose photo '}
              onPress={showImagePicker}
            />
          </View>

          <ButtonWithText
            negativeStyle
            text={'Skip for now'}
            onPress={() => navigation.navigate('BusinessWizardStripe', { businessID: businessID })}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}