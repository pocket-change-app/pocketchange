
import { Pressable, ScrollView, Button } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { DivHeader, SettingPressable } from "../components/Cards";

import { useAuth } from '../contexts/Auth';
import { user } from "../dummy";
import { Style } from "victory-core";
import { styles } from "../Styles";
import { HorizontalLine } from "../components/Lines";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";


export default function ConsumerSettingsScreen() {
  const auth = useAuth();
  const signOut = async () => {
    await auth.signOut();
  };

  const switchAccount = async () => {
    await auth.switchAccount();
  }


  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={[styles.container]}>
        <View style={styles.card}>
          <SettingPressable
            iconName='id-card'
            settingText={`Edit Profile`}
          />
        </View>

        <DivHeader text="Account" />

        <View style={styles.card}>
          {/* <HorizontalLine /> */}
          <SettingPressable
            iconName='key'
            settingText={'Change Password'}
          />
          <HorizontalLine />
          <SettingPressable
            iconName='at'
            settingText={'Change Email'}
          />
          {/* </View> */}

          {/* <DivHeader text="Payment" /> */}

          {/* <View style={styles.card}> */}
          <HorizontalLine />

          <SettingPressable
            iconName='hand-holding-usd'
            settingText={"Payment Methods"}
          />
        </View>

        <DivHeader text="Privacy" />

        <View style={styles.card}>
          <SettingPressable
            iconName='envelope'
            settingText={"Email"}
          />
          <HorizontalLine />
          <SettingPressable
            iconName='map-pin'
            settingText={"Location Data"}
          />
        </View>

        <DivHeader text="Other" />

        {/* <FontAwesome name='key' */}

        <View style={styles.card}>
          <SettingPressable
            iconName='external-link-alt'
            settingText={"Share PocketChange"}
          />
          <HorizontalLine />
          <SettingPressable
            iconName='info-circle'
            settingText={"About"}
          />
        </View>

        {
          (auth.authData.type == "merchant") ? <Button title="Switch to Merchant Account" onPress={switchAccount} /> : <></>
        }


        <Button title="Sign Out" onPress={signOut} />

      </ScrollView>
    </ScreenContainer >
  )
}