import { Pressable, Image } from 'react-native';
import { Text, View } from './Themed';
import { styles } from '../Styles';
import { user } from '../dummy';


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

export function IdCard(
  { name, imageURL, lifetimeChange, dateOfBirth }:
    {
      name: { [key: string]: string },
      imageURL?: string,
      lifetimeChange: number,
      dateOfBirth: string
    }) {
  return (
    <View style={[styles.card, styles.idCard]}>
      <View style={styles.idHeader}>
        <Text style={styles.idAppName}>pocketchange</Text>
        <Text style={[styles.idText, styles.alignRight]}>USER ID</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.idImage}
          source={imageURL}
        />
        <View style={styles.idContent}>
          <Text style={styles.idLastName}>{name.last}</Text>
          <Text style={styles.idFirstName}>{name.first + ' ' + name.middle}</Text>
          <Text style={styles.idLifeTimeChange}>{pad(lifetimeChange, 14)}</Text>
        </View>
      </View>
      <View style={[styles.idHeader, {}]}>
        <Text style={styles.idText}>USER ID</Text>
        <Text style={[styles.idDateOfBirth, styles.alignRight]}>{user.dateOfBirth}</Text>
      </View>
    </View>
  )
}


function pad(n: number, size: number) {
  let num = n.toString();
  while (num.length < size)
    num = "0" + num;
  return num;
}