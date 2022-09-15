
import { Pressable, ScrollView, Button, Image } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { BusinessCardSm, DivHeader, SettingPressable } from "../components/Cards";

//import { useAuth } from '../contexts/Auth';
import { businesses, user } from "../dummy";
import { Style } from "victory-core";
import { styles } from "../Styles";
import { HorizontalLine } from "../components/Lines";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";


export default function MerchantSettingsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const signOut = async () => {
    await authContext.signOut();
  };

  // TODO: hook this up to authContext.switchActiveRole
  const switchAccount = async () => {
    //await auth.switchAccount();
  }

  const business = businesses.find(b => b.businessName == 'La Paella')

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={[styles.container]}>

        <Pressable
          onPress={() => navigation.navigate('Business', {
            // navigation: navigation,
            business: business,
          })}
        >
          <View style={[styles.card]}>

            <View style={styles.businessListItemCard}>

              <View style={styles.businessListImageContainer}>
                <Image
                  style={styles.businessListImage}
                  source={business.imageURL}
                />
              </View>

              <View style={styles.businessListInfo}>
                <Text numberOfLines={1} style={styles.businessNameSm}>{business.businessName}</Text>
                <Text numberOfLines={1} style={styles.address}>{business.address.buildingNumber} {business.address.streetName}</Text>
                <Text style={styles.pocket}>Leslieville</Text>
              </View>

            </View>

            <HorizontalLine />

            <SettingPressable
              iconName='id-card'
              settingText={`Edit Business Profile`}
              onPress={() => navigation.navigate('EditBusinessProfile')}
            />

            <HorizontalLine />

            <SettingPressable
              iconName='users'
              settingText="Employees"
              onPress={() => navigation.navigate('EditEmployees')}
            />

          </View>



        </Pressable>


        {/* <DivHeader text="Permissions" />

        <View style={styles.card}>

        </View> */}



        <DivHeader text="Payments" />

        <View style={styles.card}>
          <SettingPressable
            iconName='hand-holding-usd'
            settingText={"Stripe Account"}
          />

          {/* <HorizontalLine /> */}

          {/* <SettingPressable
            settingText="Taxes"
          /> */}

          <HorizontalLine />

          <SettingPressable
            settingText="Tipping"
            onPress={() => navigation.navigate('SettingsTipping')}
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