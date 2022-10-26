import { useContext } from "react";
import { ScrollView } from "react-native";
import { DivHeader, SettingPressable } from "../../components/Cards";
import { HorizontalLine } from "../../components/Lines";
import { ScreenContainer, View } from "../../components/Themed";
import { AuthContext } from "../../contexts/Auth";
import { styles } from "../../Styles";

export default function SettingsAboutScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={[styles.container]}
      >

        <DivHeader text="Documents" />

        <View style={styles.card}>
          <SettingPressable
            iconName='bell-concierge'
            settingText={"Terms of Service"}
          // onPress={navigation.navigate('ViewPDF', {
          //   title: "Terms of Service",
          //   document: require('../documents/Terms_of_Service.pdf')
          // })}
          />
          <HorizontalLine />
          <SettingPressable
            iconName='privacy'
            settingText={"Privacy Policy"}
          />
        </View>

      </ScrollView>
    </ScreenContainer >
  )
}