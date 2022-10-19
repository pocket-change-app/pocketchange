
import { Pressable, ScrollView, Button, Image, ActivityIndicator } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { BusinessCardSm, DivHeader, SettingPressable, SwitchAccountDropdown } from "../components/Cards";

import { businesses, user } from "../dummy";
import { Style } from "victory-core";
import { styles } from "../Styles";
import { HorizontalLine } from "../components/Lines";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useContext } from "react";
import { AuthContext, RoleType } from "../contexts/Auth";

import UserQueries from "../hooks-apollo/User/queries";

import businessImages from '../assets/images/businessImages';
import { useBusinessQuery } from "../hooks-apollo";
import { colors } from "../constants/Colors";
import { isNilOrEmpty } from "ramda-adjunct";


export default function MerchantSettingsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const businessID = authContext.activeRole.entityID

  const { data: businessData, loading: businessLoading, error: businessError, refetch: refetchBusiness } = useBusinessQuery(businessID)

  // TODO: make roles not hard coded!!!!
  //const { data: rolesData, loading: rolesLoading, error: rolesError } = useGetUserRolesQuery(authContext.userFirebase.uid);
  //if (rolesError) return <Text>{rolesError.message}</Text>;
  //if (rolesLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />
  const rolesData = {}
  rolesData.getUserRoles = [
    {type: "CONSUMER"},
    {type: "LEADER", entityID: "2p", entityName: "Uptown Yonge"},
    {type: "MERCHANT", entityID: "5b", entityName: "Sweet Life", level: "OWNER"},
  ]
  if (businessError) {return <Text>{businessError.message}</Text>;}
  const signOut = async () => {
    await authContext.signOut();
  };

  /// TODO: hook this up to authContext.switchActiveRole
  const switchAccount = () => {
    authContext.switchActiveRole({ type: RoleType.Consumer });
    console.log(authContext.activeRole)
  }

  //const business = businesses.find(b => b.businessName == 'La Paella')

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

        {/* <View style={styles.card}>
          <SettingPressable
            iconName='random'
            settingText={`Switch Accounts`}
            onPress={() => switchAccount()}
          />
        </View> */}


        {/* {isNilOrEmpty(businessData?.business)
          ? (<ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />
          ) : (  */}
          <BusinessCardSm
          business={businessData?.business}
            showPocket
        />
        {/* )
        } */}
          <View style={[styles.card]}>

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