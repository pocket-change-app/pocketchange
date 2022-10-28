import { useState, useCallback, useContext } from "react";
import { FlatList, Modal, RefreshControl, TouchableWithoutFeedback } from "react-native";
import { ScreenStackHeaderRightView } from "react-native-screens";
import { ButtonWithText, ContestCard, DivHeader, UserCardSm } from "../../components/Cards";
import { ScreenContainer, View, Text } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { AuthContext, RoleType } from "../../contexts/Auth";
import { contestsData } from "../../dummy";
import { MARGIN, styles } from "../../Styles";
import wait, { waitTimes } from "../../utils/wait";


export default function ContestScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext)

  const { contestID } = route.params

  const contestData = { contest: contestsData.getAllContests.find(c => c.contestID === contestID) }

  const [modalVisible, setModalVisible] = useState(false)
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

      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={[styles.container, { alignItems: 'center' }]}
        ListHeaderComponent={() => {
          return (
            <>
              <ContestCard
                navigation={navigation}
                contestID={contestID}
                showDetailedView
              />

              {/* <DivHeader text="Participants" /> */}

              <DivHeader text='Participants' />
            </>
          )
        }}
        data={contestData?.contest?.participants}
        renderItem={renderParticipant}
        numColumns={2}
        keyExtractor={(item) => item.userID}
      />

      {(authContext.activeRole.type === RoleType.Leader)
        ? (
          <>
            <View style={styles.floatingButtonContainer}>
              <ButtonWithText
                text='Export'
                onPress={() => setModalVisible(true)}
              />
            </View>
            <Modal
              transparent
              animationType="fade"
              visible={modalVisible}
            >

              <TouchableWithoutFeedback
                onPress={() => setModalVisible(false)}
              >
                <View
                  style={{
                    padding: MARGIN * 1.5,
                    flex: 1,
                    backgroundColor: colors.overlay,
                    justifyContent: 'center',
                    // alignItems: 'center',
                  }}
                >
                  <View style={[styles.card, styles.container]}>
                    <Text style={styles.prompt}>
                      {'Export participant emails to '}
                      <Text style={[styles.prompt, styles.boldText]}>
                        {authContext.userFirebase.email}
                      </Text>
                      ?
                    </Text>
                    <ButtonWithText
                      text='Confirm'
                      // TODO: define and call function to export emails
                      onPress={() => null} 
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>

            </Modal>
          </>

        ) : (
          null
        )

      }

    </ScreenContainer >
  )
}