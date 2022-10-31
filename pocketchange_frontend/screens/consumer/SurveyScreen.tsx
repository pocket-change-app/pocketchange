import { NavigationState, Route, RouteProp, RouterConfigOptions } from "@react-navigation/native";
import { ButtonWithText } from "../../components/Cards";
import { View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { styles } from "../../Styles";


export default function SurveyScreen({ route, navigation }: { route: any, navigation: any }) {
  return (
    <View style={[styles.screenContainer, styles.container, { justifyContent: 'center' }]}>
      <ButtonWithText
        text="ayoooooo"
        onPress={() => navigation.goBack()}
        color={colors.tomato}
      />
    </View>
  )
}