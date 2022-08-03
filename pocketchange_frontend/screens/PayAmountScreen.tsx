import { styles } from "../Styles";
import { View, Text } from '../components/Themed'
import { CardHeader, HorizontalLine, ButtonWithText, PayAmountCard } from '../components/Cards'
import { TextInput } from "react-native";
import { useState } from "react";

export default function PayAmountScreen({ route, navigation }: { route: any, navigation: any }) {

  const { busID, name, address, pocket, imageURL } = route.params;

  const [amount, onChangeAmount] = useState(null)

  return (
    <View style={styles.container}>
      {/* <PayAmountCard
        name={name}
        address={address}
        pocket={pocket}
        imageURL={imageURL}
        navigation={navigation}
      /> */}

      <View style={styles.card}>
        <CardHeader text='Pay' />

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
          // navigation: navigation,
          busID: busID,
          name: name,
          address: address,
          pocket: pocket,
          imageURL: imageURL,
          amount: amount,
        })}
      />
    </View >
  )
}