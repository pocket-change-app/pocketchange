import { SectionList, KeyboardAvoidingView, TextInput, RefreshControl, Platform, } from 'react-native';
import { SearchBar } from '@rneui/base';

import { MARGIN, styles } from '../../Styles';
import { ScreenContainer, Text, View } from '../../components/Themed';
import { DivHeader, ButtonWithText } from '../../components/Cards';
import { colors } from '../../constants/Colors';

import { merchantAnalytics, leaderAnalytics, dummySuggestAnalyticSurvey } from '../../dummy';

import { useState, useContext, useCallback } from 'react';

import { AuthContext } from '../../contexts/Auth';
import wait, { waitTimes } from '../../utils/wait';
import { AnalyticsCard } from '../../components/AnalyticsCard';


// TODO: add hook call to query all analytics

export default function MerchantAnalyticsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);

  let allAnalytics;
  if (authContext.activeRole.type === "LEADER") {
    allAnalytics = leaderAnalytics;
  } else {
    allAnalytics = merchantAnalytics;
  }

  const [searchQuery, setSearchQuery] = useState('')
  // const [searchResults, setSearchResults] = useState('')


  const [refreshing, setRefreshing] = useState(false)

  const searchResults = allAnalytics.map((section) =>
  ({
    sectionTitle: section.sectionTitle,
    data: section.data.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase().trim()))
  })
  )

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      // refetchAnalytics // once query is in
    ]).then(() => setRefreshing(false));
  }, []);



  /* if (isNilOrEmpty(allAnalytics)) {
    return (null)
  } */

  // const updateSearch = (text: string) => {
  //   setSearchQuery(text)
  //   setSearchResults(() => {
  //     const formattedQuery = text.toLowerCase().trim()
  //     const results = allAnalytics.map((section) =>
  //     ({
  //       sectionTitle: section.sectionTitle,
  //       data: section.data.filter(a => a.title.toLowerCase().includes(formattedQuery))
  //     })
  //     )
  //     return results
  //   })
  // };


  const renderSectionHeader = ({ section: { sectionTitle, data } }: { section: { sectionTitle: string, data: any[] } }) => {
    if (data.length > 0) {
      return (<DivHeader text={sectionTitle} />)
    } else {
      return (null)
    }
  }

  const renderAnalyticsCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <AnalyticsCard
      key={item.title} //TODO: is this right?
      title={item.title}
      type={item.type}
      data={item.data}
      startDate={item.startDate}
      rangeName={item.rangeName}
    />
  )

  const ListFooterComponent = (
    <ButtonWithText
      text='Something Missing?'
      onPress={() => navigation.navigate('Survey', {
        survey: dummySuggestAnalyticSurvey
      })}
      viewStyle={{ marginTop: MARGIN }}
      negativeStyle
    />
  )

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >

      <ScreenContainer>

        <SectionList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          sections={searchResults}
          contentContainerStyle={styles.container}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderAnalyticsCard}
          stickySectionHeadersEnabled={false}
          // SectionSeparatorComponent={() => <View style={{margin:5}}></View>}
          ListFooterComponent={ListFooterComponent}
        />

      </ScreenContainer>

      <SearchBar
        showCancel={false}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}

        inputStyle={styles.searchBarInput}
        placeholder="Search Analytics"
        placeholderTextColor={colors.subtle}

        onChangeText={setSearchQuery}
        onClear={() => null}
        value={searchQuery} />

    </KeyboardAvoidingView>

  );
}

