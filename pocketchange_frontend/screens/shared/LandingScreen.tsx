import React, { useState, useRef, useContext } from 'react';
import { ActivityIndicator, Image, Dimensions, Text, View, TextInput } from 'react-native';

import { BUTTON_HEIGHT, MARGIN, styles } from '../../Styles';
//import { useAuth } from '../contexts/Auth';
import { ButtonWithText } from '../../components/Cards';
import { colors } from '../../constants/Colors';
import { StatusBar } from 'react-native';
import { AuthContext } from '../../contexts/Auth';

export default function LandingScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);

  const SCREEN_WIDTH = Dimensions.get('screen').width

  return (
    <>
      <StatusBar
        hidden={true}
        animated={true}
        showHideTransition='fade'
      />

      <View style={{
        backgroundColor: colors.card,
        flex: 1,
        // padding: SCREEN_WIDTH / 6,
        justifyContent: 'center',
      }}>
        <View style={{
          aspectRatio: 1,
          width: SCREEN_WIDTH / 3,
          alignSelf: 'center',
          // marginBottom: SCREEN_WIDTH / 12
        }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={require('../assets/images/icon.png')}
          />
        </View>
        <Text style={[styles.logoText, { marginBottom: MARGIN }]}>pocketchange</Text>


        <View style={{ paddingHorizontal: SCREEN_WIDTH / 6 }}>

          <View style={{ marginBottom: MARGIN }}>
            <ButtonWithText
              text="Sign Up"
              color={colors.gold}
              onPress={() => navigation.navigate('SignUp', {})}
            />
          </View>

          <View style={{ marginBottom: MARGIN }}>
            <ButtonWithText
              text="Sign In"
              negativeStyle={true}
              color={colors.gold}
              onPress={() => navigation.navigate('SignIn', {})}
            />
          </View>


        </View>
      </View>
    </>
  );
};