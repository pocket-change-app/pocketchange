import { useState } from "react";
import { TextInput } from "react-native";
import { ButtonWithText } from "../../components/Cards";
import SearchBar from "../../components/SearchBar";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { styles } from "../../Styles";
import Constants from "expo-constants";



export default function ({ route, navigation }: { route: any, navigation: any }) {

  const [searchQuery, setSearchQuery] = useState<string>('')
  // const [results, setResults] = useState<{}>()


  const goToNextScreen = () => {
    navigation.navigate('BusinessCreationEdit', {})
  };


  return (
    <ScreenContainer>
      <View style={styles.container}>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search for your business...'
        />


        <ButtonWithText
          text='Next'
          onPress={goToNextScreen}
        />

      </View>

    </ScreenContainer>
  )
}