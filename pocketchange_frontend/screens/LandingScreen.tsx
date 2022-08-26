import React, { useState } from 'react';
import { ActivityIndicator, Image, Dimensions, Text, View } from 'react-native';

import { BUTTON_HEIGHT, MARGIN, styles } from '../Styles';
import { useAuth } from '../contexts/Auth';
import { ButtonWithText } from '../components/Cards';
import { colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function LandingScreen({ route, navigation }: { route: any, navigation: any }) {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    await auth.signIn();
  };

  const SCREEN_WIDTH = Dimensions.get('screen').width

  return (
    <>
      {/* <StatusBar hidden={true} /> */}

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
          <View style={{ height: BUTTON_HEIGHT, justifyContent: 'center', marginBottom: MARGIN }}>
            {
              loading ? (

                <ActivityIndicator
                  color={colors.subtle}
                  animating={true}
                  size="small"
                />

              ) : (
                <ButtonWithText
                  text="Sign In"
                  color={colors.gold}
                  onPress={signIn}
                />
              )
            }
          </View>

          <ButtonWithText
            text="Sign Up"
            negativeStyle={true}
            onPress={() => navigation.navigate('SignUp', {})}
          />
        </View>
      </View>
    </>
  );
};