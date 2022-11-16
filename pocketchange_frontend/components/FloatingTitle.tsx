import { styles } from "../Styles";
import { Text, View } from "./Themed";


export default function FloatingTitle({ text, visible = true }: { text: string, visible?: boolean }) {
  if (!visible) return null

  return (
    <View style={styles.floatingTitleContainer}>
      <View style={[styles.card, styles.container, styles.floatingTitleCard]}>
        <Text style={styles.navigationHeaderTitle}>
          {text}
        </Text>
      </View>
    </View>

  )

}