import { StyleSheet } from 'react-native';
import { colors } from '../constants/Colors'
import { Text, View } from './Themed'


export function BusinessCardSm({ name, address, pocket, imageURL }: { name: string, address: string, pocket: string, imageURL?: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.pocket}>{pocket}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  card: {
    //flex: 1,
    marginBottom: 15,
    backgroundColor: colors.card,
    borderColor: colors.light,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontFamily: 'metropolis black',
    color: colors.dark,
  },
  address: {
    fontSize: 18,
    fontFamily: 'metropolis medium',
    color: colors.medium,
  },
  pocket: {
    fontSize: 18,
    fontFamily: 'metropolis bold italic',
    color: colors.subtle,
  }
})