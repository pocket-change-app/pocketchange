import { SectionList, KeyboardAvoidingView, TextInput, RefreshControl, Platform, } from 'react-native';
import { Button, SearchBar } from '@rneui/base';

import { MARGIN, styles } from '../../Styles';
import { ScreenContainer, Text, View } from '../../components/Themed';
import { DivHeader, ButtonWithText } from '../../components/Cards';
import { colors } from '../../constants/Colors';

import { merchantMetrics, leaderMetrics, dummySuggestMetricSurvey } from '../../dummy';

import { useState, useContext, useCallback } from 'react';

import { AuthContext } from '../../contexts/Auth';
import wait, { waitTimes } from '../../utils/wait';
import MetricCard from '../../components/MetricCard';


// TODO: add hook call to query all metrics

export default function LeaderMetricsScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext);

  let allMetrics;
  if (authContext.activeRole.type === "LEADER") {
    allMetrics = leaderMetrics;
  } else {
    allMetrics = merchantMetrics;
  }

  const [searchQuery, setSearchQuery] = useState('')

  const [refreshing, setRefreshing] = useState(false)

  const searchResults = allMetrics.map((section) => (
    {
      sectionTitle: section.sectionTitle,
      data: section.data.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    }
  ))

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      // refetchMetrics // once query is in
    ]).then(() => setRefreshing(false));
  }, []);


  const renderSectionHeader = ({ section: { sectionTitle, data } }: { section: { sectionTitle: string, data: any[] } }) => {
    if (data.length > 0) {
      return (<DivHeader text={sectionTitle} />)
    } else {
      return (null)
    }
  }


  const renderMetricCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <MetricCard
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
        survey: dummySuggestMetricSurvey
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
          renderItem={renderMetricCard}
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
        placeholder="Search Metrics"
        placeholderTextColor={colors.subtle}

        onChangeText={setSearchQuery}
        onClear={() => null}
        value={searchQuery} />

    </KeyboardAvoidingView>

  );
}

function SuggestMetricForm() {
  return (
    <View style={[styles.card, styles.container]}>
      <View style={styles.metricsHeaderContainer}>
        <Text style={styles.metricsTitle}>Something missing?</Text>
      </View>
      <View style={styles.metricsContentContainer}>
        <Text style={styles.prose}>
          Suggest a metric you'd like to see...
        </Text>
        <View style={[styles.signUpInputText, { marginBottom: MARGIN }]}>
          <TextInput
            // autoFocus={true}
            selectionColor={colors.gold}
            style={styles.receipt}
            // onChangeText={""}
            placeholder={""}
            multiline
            numberOfLines={3}
            placeholderTextColor={colors.subtle}
            onSubmitEditing={() => { }} />
        </View>
        <ButtonWithText
          text='Submit'
          color={colors.gold}
          onPress={null}
        />
      </View>

    </View>
  );
}