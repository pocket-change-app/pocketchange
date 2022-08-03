import { StatusBar } from 'expo-status-bar';
import { Platform, Image, Pressable, ScrollView } from 'react-native';

import { styles } from '../Styles';
import { Text, View } from '../components/Themed';
import { colors } from '../constants/Colors';

export default function ConsumerTransactionScreen({ route }: { route: any }) {

  const { timestamp, amount, merchant, pocket, changeUsed, changeEarned } = route.params;

  return (
    <ScrollView style={styles.container}>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}

      <View style={styles.card}>

        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{merchant}</Text>
          <Text style={styles.address}>${amount}</Text>
          <Text style={styles.pocket}>{pocket}</Text>
        </View>

      </View>

      {/* timestamp: '2022-05-05 04:20:23', // yyyy-mm-dd-hh-mm-ss
      amount: '3.60',
      merchant: "Jimmy's Coffee",
      pocket: 'Riverside',
      changeUsed: '0.50',
      changeEarned: '0.31', */}



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