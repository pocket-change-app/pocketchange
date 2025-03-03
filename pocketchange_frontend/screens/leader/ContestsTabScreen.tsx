import { KeyboardAvoidingView, RefreshControl, SectionList } from 'react-native';
import { useCallback, useContext, useState } from 'react';

import { styles, BUTTON_HEIGHT, MARGIN } from '../../Styles';
import { ScreenContainer } from '../../components/Themed';
import { ButtonWithText, ContestCard, DivHeader } from '../../components/Cards';
import { View } from '../../components/Themed';
import { colors } from '../../constants/Colors';


import { AuthContext } from '../../contexts/Auth';
import { contestsData } from '../../dummy';
import wait, { waitTimes } from '../../utils/wait';
const R = require('ramda');

export default function ContestsTabScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      // refetchContests // once queried
    ]).then(() => setRefreshing(false));
  }, []);


  const allSections = [
    {
      title: 'Active',
      data: [contestsData.getAllContests[0]]
    },
    {
      title: 'Completed',
      data: contestsData.getAllContests.slice(1)
    }
  ]


  const renderContest = ({ item, index, separators }: any) => {
    return (
      <ContestCard
        navigation={navigation}
        contestID={item.contestID}
      />
    )
  }

  const renderSectionHeader = ({ section: { title, data } }: { section: { title: string, data: any[] } }) => {
    if (title && data.length > 0) {
      return (<DivHeader text={title} />)
    } else {
      return (<></>)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}>

      <ScreenContainer>

        <SectionList
          contentContainerStyle={[styles.container]}
          keyExtractor={(item, index) => item + index}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          sections={allSections}
          renderItem={renderContest}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          ListFooterComponent={<View style={{ height: BUTTON_HEIGHT }} />}
        />

        {/* <DivHeader text={'Active'} /> */}

        {/* <ContestCard
            navigation={navigation}
            contest={snapItUp}
          /> */}

        {/* <DivHeader text={'Completed'} /> */}

        {/* <Text style={[styles.notFoundText, { margin: 10 }]}>No contests have completed yet...</Text> */}

        <View style={styles.floatingButtonContainer}>
          <ButtonWithText
            text='Create Contest'
            color={colors.gold}
            // negativeStyle={true}
            onPress={() => navigation.navigate('ContestWizard')}
          />
        </View>

      </ScreenContainer>

    </KeyboardAvoidingView>

  )

}