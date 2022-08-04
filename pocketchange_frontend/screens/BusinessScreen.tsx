import { Platform, Image, Pressable, ScrollView } from 'react-native';

import { styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BusinessCard } from '../components/Cards';

import { colors } from '../constants/Colors';

export default function BusinessScreen({ route, navigation }: { route: any, navigation: any }) {

  // console.log(route)
  const { business } = route.params;

  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>

        <BusinessCard
          navigation={navigation}
          business={business}
        />

        <View style={[styles.card, styles.pocketChangeBalanceCard]}>
          <Text style={styles.pocketBig}>{business.pocket} Change</Text>
          <Text style={styles.changeLg}>$8.94</Text>
        </View>

        <View style={[styles.card, styles.container]}>
          <Text style={styles.businessBioText}>{business.bio}</Text>
          <Signature name={business.people[0].name} position={business.people[0].position} imageURL={business.people[0].imageURL} />
        </View>

      </ScrollView>
    </ScreenContainer>
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