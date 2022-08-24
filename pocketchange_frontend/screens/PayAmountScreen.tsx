import { MARGIN, styles } from "../Styles";
import { View, Text, ScreenContainer } from '../components/Themed'
import { CardHeader, ButtonWithText, PayAmountCard } from '../components/Cards'
import { HorizontalLine } from "../components/Lines";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { colors } from "../constants/Colors";


export default function PayAmountScreen({ route, navigation }: { route: any, navigation: any }) {

  const { business } = route.params;

  const { busID, name, address, pocket, imageURL } = business;

  const [amount, setAmount] = useState('')

  function onChangeAmount(amt: string) {
    setAmount(amt)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScreenContainer>
        <View style={[styles.container, { flex: 1, justifyContent: 'center' }]}>

          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

          {/* <PayAmountCard
        name={name}
        address={address}
        pocket={pocket}
        imageURL={imageURL}
        navigation={navigation}
      /> */}
          <View>
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

              <View style={styles.inputContainer}>
                <Text style={styles.paymentInputText}>$</Text>
                <TextInput
                  autoFocus={true}
                  style={styles.paymentInputText}
                  keyboardType='numeric'
                  value={amount}
                  onChangeText={onChangeAmount}
                  placeholder={'0.00'}
                  placeholderTextColor={colors.light}
                />
              </View>

            </View>

            <ButtonWithText
              text={'Next'}
              onPress={() => navigation.navigate("PayTip", {
                navigation: navigation,
                business: business,
                amount: parseFloat(amount).toFixed(2),
              })}
            />
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  )
}