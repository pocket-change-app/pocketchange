import { SectionList, KeyboardAvoidingView, TextInput, RefreshControl, Platform, } from 'react-native';
import { SearchBar } from '@rneui/base';

import { MARGIN, styles } from '../../Styles';
import { ScreenContainer, Text, View } from '../../components/Themed';
import { DivHeader, BusinessCardSm, ButtonWithText, UserCardSm } from '../../components/Cards';
import { colors, colorScale } from '../../constants/Colors';

import { merchantAnalytics, leaderAnalytics } from '../../dummy';

import { useState, useContext, useCallback } from 'react';
import * as V from 'victory-native';
import Svg from 'react-native-svg'

import { AuthContext } from '../../contexts/Auth';
import wait, { waitTimes } from '../../utils/wait';
import { AnalyticsCard } from '../../components/AnalyticsCard';


// TODO: add hook call to query all analytics

export default function MerchantAnalyticsScreen() {

  const authContext = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState('')

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      // refetchAnalytics // once query is in
    ]).then(() => setRefreshing(false));
  }, []);

  let allAnalytics;
  if (authContext.activeRole.type === "LEADER") {
    allAnalytics = leaderAnalytics;
  } else {
    allAnalytics = merchantAnalytics;
  }

  /* if (isNilOrEmpty(allAnalytics)) {
    return (null)
  } */

  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setSearchResults(() => {
      const formattedQuery = text.toLowerCase().trim()
      const results = allAnalytics.map((section) =>
      ({
        sectionTitle: section.sectionTitle,
        data: section.data.filter(a => a.title.toLowerCase().includes(formattedQuery))
      })
      )
      return results
    })
  };


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
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >

      <ScreenContainer>

        <SectionList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          sections={searchQuery ? searchResults : allAnalytics}
          contentContainerStyle={styles.businessFlatList}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section: { sectionTitle } }) => (
            <DivHeader text={sectionTitle} />
          )}
          renderItem={renderAnalyticsCard}
          stickySectionHeadersEnabled={false}
          // SectionSeparatorComponent={() => <View style={{margin:5}}></View>}
          ListFooterComponent={<SuggestAnalyticForm />}
        />

      </ScreenContainer>

      <SearchBar
        showCancel={false}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}

        inputStyle={styles.searchBarInput}
        placeholder="Search Analytics"
        placeholderTextColor={colors.subtle}

        onChangeText={updateSearch}
        onClear={() => null}
        value={searchQuery} />

    </KeyboardAvoidingView>

  );
}

function SuggestAnalyticForm() {
  return (
    <View style={[styles.card, styles.container]}>
      <View style={styles.analyticsHeaderContainer}>
        <Text style={styles.analyticsTitle}>Something missing?</Text>
      </View>
      <View style={styles.analyticsContentContainer}>
        <Text style={styles.prose}>
          Suggest a metric you'd like to see...
        </Text>
        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <TextInput
            // autoFocus={true}
            selectionColor={colors.gold}
            style={styles.receipt}
            onChangeText={""}
            placeholder={""}
            multiline
            numberOfLines={3}
            placeholderTextColor={colors.subtle}
            onSubmitEditing={() => { }} />
        </View>
        <ButtonWithText
          text='Submit'
          color={colors.gold} />
      </View>

    </View>
  );
}