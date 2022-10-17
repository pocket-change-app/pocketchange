import { FlatList } from "react-native";
import { ContestCard, DivHeader, UserCardSm } from "../components/Cards";
import { ScreenContainer, View, Text } from "../components/Themed";
import { styles } from "../Styles";


export default function ContestScreen({ navigation, route }: { navigation: any, route: any }) {

  const { contest } = route.params

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
              <ContestCard
                navigation={navigation}
                contest={contest}
                showDetailedView
              />

              <DivHeader text="Participants" />
            </>
          )
        }}
        data={contest.participants}
          renderItem={renderParticipant}
          numColumns={2}
          keyExtractor={(item) => item.userID} />
  
    </ScreenContainer>
  )
}