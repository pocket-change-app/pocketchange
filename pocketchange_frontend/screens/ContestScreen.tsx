import { useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ContestCard, DivHeader, UserCardSm } from "../components/Cards";
import { ScreenContainer, View, Text } from "../components/Themed";
import { contestsData } from "../dummy";
import { styles } from "../Styles";
import wait, { waitTimes } from "../utils/wait";


export default function ContestScreen({ navigation, route }: { navigation: any, route: any }) {

  const { contestID } = route.params

  const contestData = { contest: contestsData.getAllContests.find(c => c.contestID === contestID) }

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),

      //// TODO: Refetch contest here ////

    ]).then(() => setRefreshing(false));
  }, []);

  const renderParticipant = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <UserCardSm
      user={item}
    />
  )

  return (
    <ScreenContainer>
      {/* <View style={styles.container}> */}

     
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={[styles.container]}
        ListHeaderComponent={() => {
          return (
            <>
              <ContestCard
                navigation={navigation}
                contestID={contestID}
                showDetailedView
              />

              <DivHeader text="Participants" />
            </>
          )
        }}
        data={contestData?.contest?.participants}
        renderItem={renderParticipant}
        numColumns={2}
        keyExtractor={(item) => item.userID} />
  
    </ScreenContainer>
  )
}