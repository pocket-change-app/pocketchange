import { styles } from "../Styles";
import { View, Text, ScreenContainer } from '../components/Themed'
import { CardHeader, ButtonWithText, PayAmountCard } from '../components/Cards'
import { HorizontalLine } from "../components/Lines";
import { TextInput } from "react-native";
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';


export default function PayAmountScreen({ route, navigation }: { route: any, navigation: any }) {

  const { business } = route.params;

  const { busID, name, address, pocket, imageURL } = business;

  const [amount, onChangeAmount] = useState(null)

  return (
    <ScreenContainer>
      <View style={styles.container}>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        {/* <PayAmountCard
        name={name}
        address={address}
        pocket={pocket}
        imageURL={imageURL}
        navigation={navigation}
      /> */}

        <View style={styles.card}>
          {/* <CardHeader text='Pay' /> */}

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.businessListInfo}>
              <Text style={styles.businessNameSm}>{name}</Text>
              <Text style={styles.address}>{address}</Text>
              <Text style={styles.pocket}>{pocket}</Text>
            </View>
          </View>

          <HorizontalLine />

          <View style={styles.container}>
            <TextInput
              keyboardType='numeric'
              value={'$' + amount}
              onChangeText={onChangeAmount}
              placeholder="$"
            />
          </View>
        </View>

        <ButtonWithText
          text={'Next'}
          onPress={() => navigation.navigate("PayTip", {
            navigation: navigation,
            business: business,
          })}
        />
      </View>
    </ScreenContainer>
  )
}