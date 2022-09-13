
import { Pressable, ScrollView, Button } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { DivHeader, SettingPressable } from "../components/Cards";

//import { useAuth } from '../contexts/Auth';
import { user } from "../dummy";
import { Style } from "victory-core";
import { styles } from "../Styles";
import { HorizontalLine } from "../components/Lines";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";


export default function ConsumerSettingsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const signOut = async () => {
    await authContext.signOut();
  };

  // TODO: hook this up to authContext.switchActiveRole
  const switchAccount = async () => {
    //await auth.switchAccount();
  }


  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={[styles.container]}>
        <View style={styles.card}>
          <SettingPressable
            iconName='id-card'
            settingText={`Edit Profile`}
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>

        <DivHeader text="Account" />

        <View style={styles.card}>
          <SettingPressable
            iconName='hand-holding-usd'
            settingText={"Payment Methods"}
          />

          <HorizontalLine />

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
          {/* <HorizontalLine /> */}

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
            onPress={() => navigation.navigate('About')}
          />
        </View>

        {
          // (auth.authData.type == "merchant") ? <Button title="Switch to Merchant Account" onPress={switchAccount} /> : <></>
        }


        {/* <Button title="Sign Out" onPress={signOut} /> */}

        <Pressable
          style={[styles.card, { height: 45, justifyContent: 'center', }]}
          onPress={() => navigation.navigate("BusinessWizardProfile")}
        >
          <Text style={[styles.settingText, { textAlign: 'center', alignSelf: 'center' }]}>Biz Whiz</Text>
          {/* <HorizontalLine /> */}
        </Pressable>

        <Pressable
          style={[styles.card, { height: 45, justifyContent: 'center', }]}
          onPress={signOut}

        >
          <Text style={[styles.settingText, { textAlign: 'center', alignSelf: 'center' }]}>Sign Out</Text>
          {/* <HorizontalLine /> */}
        </Pressable>



      </ScrollView>
    </ScreenContainer >
  )
}