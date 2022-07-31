import { StatusBar } from 'expo-status-bar';
import { Platform, Image, Pressable, ScrollView } from 'react-native';

import { styles } from '../Styles';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { colors } from '../constants/Colors';

export default function TransactionModalScreen({ route, navigation }: { route: any, navigation: any }) {

  const { transaction } = route.params;

  return (
    <ScrollView style={styles.container}>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View style={styles.card}>

        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{transaction.userID}</Text>
          <Text style={styles.address}>{transaction.value}</Text>
          <Text style={styles.pocket}>{transaction.date}</Text>
        </View>
        
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