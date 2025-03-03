
import { Pressable, ScrollView } from "react-native";
import { ScreenContainer, View, Text } from "../../components/Themed";
import { DivHeader, SettingPressable, SwitchAccountDropdown } from "../../components/Cards";

import { styles } from "../../Styles";
import { HorizontalLine } from "../../components/Lines";
import React, { useContext } from "react";
import { AuthContext, RoleType } from "../../contexts/Auth";

import { usePocketQuery } from "../../hooks-apollo";


export default function LeaderSettingsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);

  let pocketID = authContext.activeRole.entityID

  const { data: pocketData, loading: pocketLoading, error: pocketError } = usePocketQuery(pocketID)
  if (pocketError) { return <Text>{pocketError.message}</Text>; }

  const signOut = async () => {
    await authContext.signOut();
  };

  /// TODO: hook this up to authContext.switchActiveRole
  const switchAccount = () => {
    authContext.switchActiveRole({ type: RoleType.Consumer });
    console.log(authContext.activeRole)
  }

  const rolesData = {}
  rolesData.getUserRoles = [
    { type: "CONSUMER" },
    { type: "LEADER", entityID: "2p", entityName: "Uptown Yonge" },
    { type: "MERCHANT", entityID: "5b", entityName: "Sweet Life", level: "OWNER" },
  ]

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={[styles.container]}>

        {// TODO: make drop down
        }

        <SwitchAccountDropdown
          authContext={authContext}
          rolesList={rolesData.getUserRoles}
        />

        <View style={styles.card}>

          <View style={[styles.businessListItemCard, { alignItems: 'center', justifyContent: 'center' }]}>
            <Text numberOfLines={1} style={[styles.pocketTitle, { textAlign: 'center' }]}>{pocketData?.pocket.pocketName}</Text>


          </View>

          <HorizontalLine />

          <SettingPressable
            iconName='id-card'
            settingText={`Edit Pocket Page`}
            onPress={() => navigation.navigate('EditPocketPage')}
          />

          {/* <HorizontalLine /> */}

          {/* <SettingPressable
              iconName='users'
              settingText="Businesses"
              onPress={() => navigation.navigate('PocketBusinessesList')}
            /> */}

        </View>




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