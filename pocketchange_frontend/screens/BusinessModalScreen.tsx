import { StatusBar } from 'expo-status-bar';
import { Platform, Image, Pressable, ScrollView } from 'react-native';

import { styles } from '../Styles';
import { Text, View } from '../components/Themed';
import { colors } from '../constants/Colors';

export default function BusinessModalScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL, bio, people } = route.params;

  return (
    <ScrollView style={styles.container}>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View style={styles.card}>
        <View style={styles.businessHeaderImageContainer}>
          <Image
            style={styles.businessHeaderImage}
            source={imageURL}
          />
        </View>
        <View style={styles.businessModalInfo}>
          <Text style={styles.businessNameLg}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.pocket}>{pocket}</Text>

          <Pressable style={styles.payButton}
            onPress={() => (navigation.navigate('PayAmount', {
              busID: busID,
              name: name,
              address: address,
              pocket: pocket,
              imageURL: imageURL,
            }))}
          >
            <Text style={styles.payButtonText}>PAY</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.card, styles.pocketChangeBalanceCard]}>
        <Text style={styles.pocketBig}>{pocket} Change</Text>
        <Text style={styles.changeLg}>$8.94</Text>
      </View>

      <View style={[styles.card, styles.container]}>
        <Text style={styles.businessBioText}>{bio}</Text>
        <Signature name={people[0].name} position={people[0].position} imageURL={people[0].imageURL} />
      </View>




    </ScrollView>
  );
}


function Signature({ name, position, imageURL }: { name: string, position: string, imageURL: string }) {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <Image
        style={styles.signatureImage}
        source={imageURL}
      />
      <View style={{ justifyContent: 'center' }}>
        <Text style={[styles.signatureText, { color: colors.medium }]}>{name}</Text>
        <Text style={[styles.signatureText, { color: colors.subtle }]}>{position}</Text>
      </View >
    </View >
  )
}