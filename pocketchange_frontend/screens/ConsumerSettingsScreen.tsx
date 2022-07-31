
import { Component, useState } from "react";
import { Pressable, ScrollView, Button } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { Setting } from "../components/Cards";

import {useAuth} from '../contexts/Auth';


export default function ConsumerSettingsScreen() {
  const auth = useAuth();
  const signOut = async () => {
    await auth.signOut();
  };
  return (
    <ScreenContainer>
      <ScrollView>
        <Setting
          settingText={"Setting 1"}
        />
        <Setting
          settingText={"Setting 2"}
        />
        <Setting
          settingText={"Setting 3"}
        />

        <Button title="Sign Out" onPress={signOut} />
        
      </ScrollView>
    </ScreenContainer >
  )
}