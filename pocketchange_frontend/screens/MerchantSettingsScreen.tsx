
import { Pressable, ScrollView, Button } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";
import { SettingPressable } from "../components/Cards";

import { useAuth } from '../contexts/Auth';


export default function MerchantSettingsScreen() {
  const auth = useAuth();
  const signOut = async () => {
    await auth.signOut();
  };

  const switchAccount = async () => {
    await auth.switchAccount();
  }


  return (
    <ScreenContainer>
      <ScrollView>
        <SettingPressable
          settingText={"Setting 1"}
        />
        <SettingPressable
          settingText={"Setting 2"}
        />
        <SettingPressable
          settingText={"Setting 3"}
        />

        <Button title="Switch to Consumer Account" onPress={switchAccount} />

        <Button title="Sign Out" onPress={signOut} />

      </ScrollView>
    </ScreenContainer >
  )
}