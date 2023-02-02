import { ButtonWithText } from "../../components/Cards";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { styles } from "../../Styles";

export default function ({ route, navigation }: { route: any, navigation: any }) {
  return (
    <ScreenContainer>
      <View style={styles.container}>

        <ButtonWithText
          text='Next'
          onPress={() => navigation.navigate('BusinessCreationEdit', {})}
        />

      </View>

    </ScreenContainer>
  )
}