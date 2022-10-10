import { FlatList } from "react-native";
import { CompetitionCard, DivHeader, renderParticipant } from "../components/Cards";
import { ScreenContainer, View, Text } from "../components/Themed";
import { styles } from "../Styles";


export default function CompetitionScreen({ navigation, route }: { navigation: any, route: any }) {

  const { competition } = route.params



  return (
    <ScreenContainer>
      {/* <View style={styles.container}> */}

      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => {
          return (
            <>
              <CompetitionCard
                navigation={navigation}
                competition={competition}
                showDescription
              />

              <DivHeader text="Participants" />
            </>
          )
        }}
          data={competition.participants}
          renderItem={renderParticipant} />

      {/* </View> */}
    </ScreenContainer>
  )
}