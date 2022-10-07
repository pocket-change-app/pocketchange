
import { Pressable, ScrollView, Button } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { DivHeader, SettingPressable, SwitchAccountDropdown } from "../components/Cards";

//import { useAuth } from '../contexts/Auth';
import { user } from "../dummy";
import { Style } from "victory-core";
import { styles } from "../Styles";
import { HorizontalLine } from "../components/Lines";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext, Role, RoleLevel, RoleType } from "../contexts/Auth";
import DropDownPicker from "react-native-dropdown-picker";

import { useQuery } from '@apollo/react-hooks'
import UserQueries from '../hooks-apollo/User/queries'

import * as RA from 'ramda-adjunct'


export default function ConsumerSettingsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 
  const userID = authContext.userFirebase.uid;

  const [userRoles, setUserRoles] = useState([])

  const { data, loading, error, refetch } = useQuery(UserQueries.getUserRoles, { variables: { userID } });
  
  useEffect(() => {
    if (RA.isNotNil(data)) {
      console.log('user data inside', data)
      // allBusinesses query is aliased as getAllBusinesses
      //const {user} = data
      setUserRoles(data)
    }
  }, [data])

  // const [open, setOpen] = useState(false);
  // const [role, setRole] = useState(authContext.activeRole);
  // const [items, setItems] = useState(items_list);

  const signOut = async () => {
    await authContext.signOut();
  };


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

        {/* <DropDownPicker
          style={styles.card}
          dropDownContainerStyle={styles.card}
          textStyle={styles.settingText}
          itemSeparator
          itemSeparatorStyle={styles.horizontalLine}

          // containerStyle={styles.card}

          open={open}
          value={role}
          items={items}

          setOpen={setOpen}
          setValue={setRole}
          setItems={setItems}

          onSelectItem={switchAccount}

          placeholder='Switch Account'
        /> */}

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