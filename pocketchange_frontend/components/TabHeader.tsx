import { colors } from "../constants/Colors";
import { BORDER_WIDTH, styles } from "../Styles";
import { Text, View } from "./Themed";


export default function ({ text, visible = true }: { text: string, visible?: boolean }) {
  if (!visible) return null

  return (
    <View style={styles.cornerHeaderContainer}>
      <View style={[styles.card, styles.cornerHeaderCard]}>
        <View style={{ alignSelf: 'flex-end', backgroundColor: colors.bg, flex: 1, width: 50, marginRight: -BORDER_WIDTH }} />
        <View style={[styles.container, { flex: 2, justifyContent: 'flex-end', }]}>
          <Text style={[styles.navigationHeaderTitle]}>
            {text}
          </Text>

        </View>

      </View>
    </View>

  )

}