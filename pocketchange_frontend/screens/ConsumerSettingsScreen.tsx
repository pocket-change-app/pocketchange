
import { Pressable, ScrollView, Button, ActivityIndicator } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { DivHeader, SettingPressable, SwitchAccountDropdown } from "../components/Cards";

//import { useAuth } from '../contexts/Auth';
import { user } from "../dummy";
import { Style } from "victory-core";
import { styles } from "../Styles";
import { HorizontalLine } from "../components/Lines";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, Role, RoleLevel, RoleType } from "../contexts/Auth";
import DropDownPicker from "react-native-dropdown-picker";

import { useQuery } from '@apollo/react-hooks'
import UserQueries from '../hooks-apollo/User/queries'

import * as RA from 'ramda-adjunct'
import { colors } from "../constants/Colors";


export default function ConsumerSettingsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const [userRoles, setUserRoles] = useState([])

  let userID = authContext.userFirebase.uid;
  //userID = "10c"

  const rolesData = {}
  rolesData.getUserRoles = [
    {type: "CONSUMER"},
    {type: "LEADER", entityID: "2p", entityName: "Uptown Yonge"},
    {type: "MERCHANT", entityID: "5b", entityName: "Sweet Life", level: "OWNER"},
  ]

  //const { data: rolesData, loading: rolesLoading, error: rolesError } = useQuery(UserQueries.getUserRoles, { variables: { userID: userID } });
  //if (rolesError) return <Text>{rolesError.message}</Text>;
  //if (rolesLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />
  

  const signOut = async () => {
    await authContext.signOut();
  };

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={[styles.container]}>

        <SwitchAccountDropdown
          authContext={authContext}
          rolesList={rolesData.getUserRoles}
        />

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
          onPress={() => navigation.navigate("BusinessWizardProfile", {pocketID : "1p"})}
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