import { StatusBar } from 'expo-status-bar';
import { Platform, Image, Pressable, ScrollView } from 'react-native';

import { styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { colors } from '../constants/Colors';
import { PaySummaryCard, TransactionSummaryCard } from '../components/Cards';

export default function ConsumerTransactionScreen({ route, navigation }: { route: any, navigation: any }) {

  const { transaction } = route.params;

  const { timestamp, amount, merchant, pocket, changeUsed, changeEarned } = transaction;

  return (
    <ScreenContainer>
      <View style={styles.container}>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}

        {/* <View style={[styles.card, styles.container]}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>Total</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}>{amount}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>${amount}</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}></Text>
          </View>

        </View> */}

        <TransactionSummaryCard
          transaction={transaction}
        />

        {/* timestamp: '2022-05-05 04:20:23', // yyyy-mm-dd-hh-mm-ss
      amount: '3.60',
      merchant: "Jimmy's Coffee",
      pocket: 'Riverside',
      changeUsed: '0.50',
      changeEarned: '0.31', */}

      </View>
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