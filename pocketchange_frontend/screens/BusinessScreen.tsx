import { Platform, Image, Pressable, ScrollView } from 'react-native';

import { MARGIN, styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BusinessCard } from '../components/Cards';

import { colors } from '../constants/Colors';
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';

export default function BusinessScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  // console.log(route)
  const { business, pocket } = route.params;

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
      >

        <BusinessCard
          navigation={navigation}
          business={business}
          pocket={pocket}
        />

        <View style={[styles.card, styles.pocketChangeBalanceCard]}>
          <Text style={styles.pocketBig}>{pocket} Change</Text>
          <Text style={styles.changeLg}>$8.94</Text>
        </View>

        <View style={[styles.card, styles.container]}>
          <Text style={[styles.prose, { marginBottom: MARGIN }]}>{business.bio}</Text>
          {
          // TODO: Need to make resolver for getting owner and signature
          <Signature name={"TODO: business.people[0].name"} position={"business.people[0].position"} imageURL={"business.people[0].imageURL"} />
          }
        </View>

        <View style={{ height: MARGIN }} />

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