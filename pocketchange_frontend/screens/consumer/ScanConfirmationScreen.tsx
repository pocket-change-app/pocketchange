import { StatusBar } from "expo-status-bar";
import { Dimensions, Easing, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { Text, View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { MARGIN, styles } from "../../Styles";
import TextTicker from 'react-native-text-ticker'
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { FontAwesome } from "@expo/vector-icons";
import { useBusinessQuery } from "../../hooks-apollo";


export default function ScanConfirmationScreen({ route, navigation }: any) {

  const authContext = useContext(AuthContext);

  const { QRScan } = route.params;
  const dateTimeString = QRScan.date
  // console.log(dateTimeString);

  const dateTime = new Date(dateTimeString)

  const businessQuery = useBusinessQuery(QRScan.businessID)
  const { data: businessData, loading: businessLoading, error: businessError } = businessQuery
  if (businessError) return (<Text>{businessError.message}</Text>)

  // console.log(dateTime)
  // console.log('inside confirmation component')

  return (
    <>
      <StatusBar hidden={true} />
      <TouchableWithoutFeedback
        onPress={() => {
          // navigation.goBack()
          navigation.navigate('Root', { screen: 'WalletStack', params: { screen: 'Wallet' } })
          // navigation.popToTop()
        }}
      >

        <SafeAreaView style={{
          flex: 1,
          backgroundColor: colors.green,
          justifyContent: "space-between",
          alignItems: 'center',
          // paddingTop: 100,
          // paddingBottom: MARGIN * 2,
        }}>

          <TextTicker
            style={styles.movingBannerText}
            duration={50000}
            // scrollSpeed={1000}
            animationType={'scroll'}
            loop
            repeatSpacer={0}
            marqueeDelay={0}
            easing={Easing.linear}
            isRTL={true}
          >
            {'pocketchange  '.repeat(10)}
          </TextTicker>

          <View style={{
            // height: Dimensions.get('screen').height * 1 / 2,
            justifyContent: 'space-between'
          }}>
            <Text style={styles.payConfirmationDetails}>
              You scanned
            </Text>

            <View style={{ marginVertical: 2 * MARGIN }}>
              <Text style={styles.payConfirmationBusiness}>
                {businessLoading ? null : businessData?.business.businessName}
                {(businessError) ? businessError.message : null}
              </Text>
            </View>

            {/* DATE */}
            <Text style={styles.payConfirmationDateTime}>
              <FontAwesome style={styles.payConfirmationDateTime} name='qrcode' />
              {' ' + dateTime.toLocaleDateString()}
            </Text>

            {/* TIME */}
            <Text style={styles.payConfirmationDateTime}>
              {dateTime.toLocaleTimeString()}
            </Text>


          </View>

          <TextTicker
            style={styles.movingBannerText}
            duration={50000}
            // scrollSpeed={1000}
            animationType={'scroll'}
            loop
            repeatSpacer={0}
            marqueeDelay={0}
            easing={Easing.linear}
          // isRTL={true}
          >
            {'pocketchange  '.repeat(10)}
          </TextTicker>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  )
}