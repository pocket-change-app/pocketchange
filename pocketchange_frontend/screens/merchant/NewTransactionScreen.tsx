import { MARGIN, styles } from "../../Styles";
import Layout from "../../constants/Layout";
import { View, Text, ScreenContainer } from '../../components/Themed'
import { CardHeader, ButtonWithText, BusinessCardSm, BusinessInfo, } from '../../components/Cards'
import { HorizontalLine } from "../../components/Lines";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, TextInput } from "react-native";
import { useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { useHeaderHeight } from '@react-navigation/elements'
import { useBusinessQuery } from "../../hooks-apollo";
import QRCode from "react-native-qrcode-svg";


export default function NewTransactionScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);
  const businessID = authContext.activeRole.entityID;

  const [amount, setAmount] = useState<string>('');
  const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(true);

  const QR_SIZE = Layout.window.width * 2 / 3
  const qrImage = require('../../assets/images/icon_blackout.png')

  // url for QR code
  const url = `https://www.pocketchangeapp.ca/open/tip/${businessID}/${parseFloat(amount).toFixed(2)}`

  const amountValid = (parseFloat(amount) > 0);

  const keyboardShowListener = Keyboard.addListener(
    'keyboardWillShow',
    () => {
      setKeyboardIsOpen(true);
    }
  );
  const keyboardHideListener = Keyboard.addListener(
    'keyboardWillHide',
    () => {
      setKeyboardIsOpen(false);
    }
  );



  return (

    <ScreenContainer>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : "height"}
        keyboardVerticalOffset={useHeaderHeight()}
        style={{ flex: 1 }}
      >

        <View style={[styles.container, { flex: 1 }]}>

          {/* BUSINESS */}

          {/* <View style={[styles.card, styles.container]}>
            <BusinessInfo businessID={businessID} wrapText />
          </View> */}

          <BusinessCardSm
            businessID={authContext?.activeRole?.entityID}
            hideImage
            wrapText
          />

          <View style={{ flex: 1, justifyContent: 'center' }}>

            <View style={styles.card}>
              <View style={styles.inputContainer}>
                <Text style={styles.paymentFocusText}>$</Text>
                <TextInput
                  autoFocus
                  style={styles.paymentFocusText}
                  keyboardType='numeric'
                  value={amount}
                  onChangeText={setAmount}
                  placeholder={'0.00'}
                  placeholderTextColor={colors.light}
                />
              </View>
            </View>


            {keyboardIsOpen ? (
              <ButtonWithText
                text={'Show QR Code'}
                color={amountValid ? colors.gold : undefined}
                onPress={() => {
                  if (amountValid) {
                    setAmount(parseFloat(amount).toFixed(2))
                    Keyboard.dismiss()
                  }
                }}
              />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <View style={[styles.card, styles.container]}>
                  <QRCode
                    size={QR_SIZE}
                    value={url}
                    logo={qrImage}
                      logoSize={QR_SIZE * 9 / 33 + 1}
                  />
                </View>
              </View>
            )
            }


          </View>

          {/* <Text>
            {url}
          </Text> */}

        </View>

      </KeyboardAvoidingView>

    </ScreenContainer>

  )
}