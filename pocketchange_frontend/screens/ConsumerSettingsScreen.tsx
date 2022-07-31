
import { Component } from "react";
import { ScrollView } from "react-native";
import { ScreenContainer, View, Text } from "../components/Themed";

export default class ConsumerSettingsScreen extends Component {

  render() {
    return (
      <ScreenContainer>
        <ScrollView>
          <Text>This is some text;</Text>
          <Text>This is some more.</Text>
        </ScrollView>
      </ScreenContainer >
    )
  }
}