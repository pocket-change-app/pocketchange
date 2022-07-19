import { Pressable, Image } from 'react-native';
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
      <View style={[styles.card, styles.businessListItemCard]}>

        <View style={styles.businessListImageContainer}>
          <Image
            style={styles.businessListImage}
            source={imageURL}
          />
        </View>

        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{name}</Text>
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
      <Text style={styles.businessNameSm}>{name}</Text>
    </View>
  )
}

export function IdCard({ name, imageURL, lifetimeChange, dateOfBirth }: { name: string, imageURL?: string, lifetimeChange: number, dateOfBirth: string }) {
  return (
    <View style={[styles.card, styles.idCard]}>
      <Text style={styles.businessNameSm}>{name}</Text>
      <Text style={styles.businessNameSm}>{lifetimeChange}</Text>
      <Text style={styles.businessNameSm}>{dateOfBirth}</Text>
    </View>
  )
}