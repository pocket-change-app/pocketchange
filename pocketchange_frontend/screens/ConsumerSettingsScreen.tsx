
import { Component } from "react";
import { ScrollView } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { Setting } from "../components/Cards";

export default function ConsumerSettingsScreen() {

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
      </ScrollView>
    </ScreenContainer >
  )
}