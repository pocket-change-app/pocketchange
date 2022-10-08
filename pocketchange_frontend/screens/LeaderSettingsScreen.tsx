
import { Pressable, ScrollView, Button, Image } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { BusinessCardSm, DivHeader, SettingPressable, SwitchAccountDropdown } from "../components/Cards";

import { businesses, pockets, user } from "../dummy";
import { Style } from "victory-core";
import { styles } from "../Styles";
import { HorizontalLine } from "../components/Lines";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext, RoleType } from "../contexts/Auth";

import businessImages from '../assets/images/businessImages';


export default function LeaderSettingsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);

  const signOut = async () => {
    await authContext.signOut();
  };

  /// TODO: hook this up to authContext.switchActiveRole
  const switchAccount = () => {
    authContext.switchActiveRole({ type: RoleType.Consumer });
    console.log(authContext.activeRole)
  }

  const pocket = pockets.find(p => p.name == 'Uptown Yonge')

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={[styles.container]}>

        {// TODO: make drop down
        }

        <SwitchAccountDropdown
          authContext={authContext}
          rolesList={user.roles}
        />

        {/* <View style={styles.card}>
          <SettingPressable
            iconName='random'
            settingText={`Switch Accounts`}
            onPress={() => switchAccount()}
          />
        </View> */}

        <Pressable
          onPress={() => navigation.navigate('Pocket', {
            // navigation: navigation,
            pocket: pocket,
          })}
        >
          <View style={styles.card}>

            <View style={styles.businessListItemCard}>

              {/* <View style={styles.businessListImageContainer}>
                <Image
                  style={styles.businessListImage}
                  source={pocketImages[business.businessID]}
                />
              </View> */}

              <View style={styles.businessListInfo}>
                <Text numberOfLines={1} style={[styles.pocketTitle, { textAlign: 'center' }]}>{pocket.name}</Text>
              </View>

            </View>

            <HorizontalLine />

            <SettingPressable
              iconName='id-card'
              settingText={`Edit Pocket Page`}
              onPress={() => navigation.navigate('EditPocketPage')}
            />

            <HorizontalLine />

            <SettingPressable
              iconName='users'
              settingText="Businesses"
              onPress={() => navigation.navigate('PocketBusinessesList')}
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

          {/* <HorizontalLine />

          <SettingPressable
            settingText="Tipping"
            onPress={() => navigation.navigate('SettingsTipping')}
          /> */}

          {/* </View> */}

          {/* <DivHeader text="Payment" /> */}

          {/* <View style={styles.card}> */}
          {/* <HorizontalLine /> */}

        </View>

        {/* <DivHeader text="Privacy" />

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
        </View> */}

        <DivHeader text="Other" />

        {/* <FontAwesome name='key' */}

        <View style={styles.card}>

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