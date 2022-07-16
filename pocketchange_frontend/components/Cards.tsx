import { Pressable } from 'react-native';
import { Text, View } from './Themed';
import { styles } from '../Styles';


export function BusinessCardSm({ navigation, name, address, pocket, imageURL }: { navigation: any, name: string, address: string, pocket: string, imageURL?: string }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('BusinessModal', {
        name: name,
        address: address,
        pocket: pocket,
        imageURL: imageURL,
      })}
      >
      <View style={styles.card}>

        <View style={ styles.businessInfo }>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.pocket}>{pocket}</Text>
        </View>
        
      </View>

      </Pressable>
  )
}

export function PocketCardSm({ name, imageURL }: { name: string, imageURL?: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

export function IdCard({ name, imageURL, lifetimeChange, dateOfBirth }: { name: string, imageURL?: string, lifetimeChange: number, dateOfBirth: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.name}>{lifetimeChange}</Text>
      <Text style={styles.name}>{dateOfBirth}</Text>
    </View>
  )
}