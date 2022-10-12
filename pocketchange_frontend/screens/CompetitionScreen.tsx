import { FlatList } from "react-native";
import { CompetitionCard, DivHeader, UserCardSm } from "../components/Cards";
import { ScreenContainer, View, Text } from "../components/Themed";
import { styles } from "../Styles";


export default function CompetitionScreen({ navigation, route }: { navigation: any, route: any }) {

  const { competition } = route.params

  const renderParticipant = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <UserCardSm
      user={item}/>
  )

  return (
    <ScreenContainer>
      {/* <View style={styles.container}> */}

     
      <FlatList
        contentContainerStyle={[styles.container]}
        ListHeaderComponent={() => {
          return (
            <>
              <CompetitionCard
                navigation={navigation}
                competition={competition}
                showDetailedView
              />

              <DivHeader text="Participants" />
            </>
          )
        }}
          data={competition.participants}
          renderItem={renderParticipant}
          numColumns={2}
          keyExtractor={(item) => item.userID} />
  
    </ScreenContainer>
  )
}