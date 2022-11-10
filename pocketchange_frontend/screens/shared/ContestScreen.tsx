import { useState, useCallback, useContext } from "react";
import { FlatList, Modal, RefreshControl, TouchableWithoutFeedback } from "react-native";
import { ScreenStackHeaderRightView } from "react-native-screens";
import { ButtonWithText, ContestCard, DivHeader, UserCardSm } from "../../components/Cards";
import { ScreenContainer, View, Text } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { AuthContext, RoleType } from "../../contexts/Auth";
import { contestsData } from "../../dummy";
import { BUTTON_HEIGHT, MARGIN, MARGIN_SM, styles } from "../../Styles";
import wait, { waitTimes } from "../../utils/wait";


export default function ContestScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext)

  const isLeader = (authContext.activeRole.type === RoleType.Leader)

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
        contentContainerStyle={[styles.container, { alignItems: 'center', paddingBottom: (isLeader ? (MARGIN_SM * 2 + BUTTON_HEIGHT) : undefined) }]}
        ListHeaderComponent={() => {
          return (
            <>
              <ContestCard
                navigation={navigation}
                contestID={contestID}
                showDetailedView
              />

              <DivHeader text='Participants' />
            </>
          )
        }}
        data={contestData?.contest?.participants}
        renderItem={renderParticipant}
        /** one million columns with flexwrap column style gives desired wrapping;
         * FlatList gives error when using flexWrap otherwise */
        numColumns={10 ** 6} 
        columnWrapperStyle={{ flexWrap: 'wrap', justifyContent: 'center' }}
        keyExtractor={(item) => item.userID}
      />

      {(isLeader)
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
                      color={colors.gold}
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