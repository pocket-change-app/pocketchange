
import { styles } from "../Styles"
import { View } from 'react-native'

export const HorizontalLine = ({ noPadding = false }: { noPadding?: boolean }) => (
  <View style={[styles.horizontalLine, noPadding ? { marginHorizontal: 0 } : null]} />
)

export const VerticalLine = () => (
  <View style={styles.verticalLine} />
)