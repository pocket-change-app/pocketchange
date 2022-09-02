import { ScreenContainer, View } from "../components/Themed";
import { styles } from "../Styles";
import Pdf from 'react-native-pdf';

export default function ViewPDFScreen({ route, navigation }: { route: any, navigation: any }) {

  const [title, docRequire] = route.params;

  // const source = { uri: docRequire };

  return (
    <ScreenContainer>
      <View style={styles.container}>
      </View>
    </ScreenContainer>
  )
}