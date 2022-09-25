import { isNumber } from "ramda-adjunct";
import { useContext, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback } from "react-native";
import { ButtonWithText } from "../components/Cards";
import { ScreenContainer, Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { AuthContext } from "../contexts/Auth";
import { MARGIN, styles } from "../Styles";
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation } from '@apollo/react-hooks'
import BusinessMutations from '../hooks-apollo/Business/mutations'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';


export default function BusinessWizardUploadImage({ route, navigation }: { route: any, navigation: any }) {

  const { pocketID } = route.params

  const authContext = useContext(AuthContext); 

  const storage = getStorage();

  const storageRef = ref(storage);
  const [pickedImagePath, setPickedImagePath] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false);

  return (
    <ScreenContainer>

        
          <ButtonWithText
            text='Next'
            // color={
            //   (emailAddress != '' && password != '') ? colors.gold : colors.subtle
            // }
            onPress={() => useCreateBusinessMutation({
              variables: {
                userID: authContext.userGQL.userID, 
                businessName: businessName, 
                // dateEstablished:$dateEstablished, 
                // emailAddress: $emailAddress, 
                phoneNumber: businessPhoneNumber, 
                // website: website, 
                businessType: businessType, 
                //businessSubtype: $businessSubtype, 
                pocketID: pocketID
              }})}
          />

    </ScreenContainer>
  )
}