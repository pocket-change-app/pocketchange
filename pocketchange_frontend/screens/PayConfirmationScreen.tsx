import { NavigationContainerRefContext } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { TouchableWithoutFeedback } from "react-native";
import { Text, View } from "../components/Themed";
import { colors } from "../constants/Colors";
import { user } from "../dummy";
import { styles } from "../Styles";


export default function PayConfirmationScreen({ route, navigation }: any) {

  const { businessName, total, date, time } = route.params;

  return (
    <>
      <StatusBar hidden={true} />
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack()
          navigation.navigate('WalletStack', { screen: 'Wallet' })
          // navigation.popToTop()
          // navigation.goBack()
          // navigation.popToTop()
        }}
      >

        <View style={{
          flex: 1,
          backgroundColor: colors.gold,
          justifyContent: "space-around",
          alignItems: 'center',
        }}>

          <Text style={styles.payConfirmationDetails}>
            {user.name.first} paid
          </Text>

          <Text style={styles.payConfirmationBusiness}>
            {businessName}
          </Text>

          <Text style={styles.payConfirmationTotal}>
            ${total}
          </Text>

          <Text style={styles.payConfirmationDateTime}>
            {date}
          </Text>

          <Text style={styles.payConfirmationDateTime}>
            {time}
          </Text>

        </View>
      </TouchableWithoutFeedback>
    </>
  )
}