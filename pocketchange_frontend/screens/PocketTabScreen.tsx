import { SafeAreaView, FlatList, ScrollView, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator, SectionList } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles, MARGIN, POCKET_CARD_SCREEN_MARGIN } from '../Styles';
import { BusinessCardSm, DivHeader, PocketCarouselCard, PocketCarouselSeparator, PocketSearchResult } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { ScreenContainer } from '../components/Themed';
import { useContext, useState } from 'react';
import { colors } from '../constants/Colors';
import { AuthContext } from '../contexts/Auth';
import PocketQueries from '../hooks-apollo/Pocket/queries'
import { useGetAllBusinessesQuery, useGetAllPocketsQuery } from '../hooks-apollo';

// const R = require('ramda');


export default function PocketTabScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState('')

  const { data: businessesData, loading: businessesLoading, refetch: refetchBusinesses } = useGetAllBusinessesQuery(undefined);
  const { data: pocketData, loading: pocketLoading, error: pocketError } = useGetAllPocketsQuery(undefined);

  if (pocketError) return <Text>{pocketError.message}</Text>;
  if (pocketLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{margin: 10}}/>
  if (!pocketData) return <Text>Error: pocketData empty.</Text>
  
  const pocketSearchResults = pocketData?.getAllPockets.filter(
    p => p.pocketName.toLowerCase().includes(
      searchQuery.toLowerCase().trim()
    )
  )

  const businessSearchResults = businessesData?.getAllBusinesses.filter(
    b => b.businessName.toLowerCase().includes(
      searchQuery.toLowerCase().trim()
    )
  )


  let allSearchResults: any[] = [{ title: null, data: [] }, { title: 'Businesses', data: [] }]

  for (var i in pocketSearchResults) {
    const p = pocketSearchResults[i]
    allSearchResults[0].data.push(
      p
    )
  }
  for (var i in businessSearchResults) {
    const b = businessSearchResults[i]
    allSearchResults[1].data.push(
      b
    )
  }

  // console.log(allSearchResults);

  const renderPocketCarouselCard = ({ item, index, separators }) => (
    <PocketCarouselCard
      key={item.pocketID}
      navigation={navigation}
      pocket={item}
    />
  )

  const renderSearchResult = ({ item }: any) => {
    switch (item.__typename) {
      case "Pocket":
        return (
          <PocketSearchResult
            navigation={navigation}
            pocket={item} />
        )
      case "Business":
        return (
          <BusinessCardSm
            navigation={navigation}
            business={item}
          />
        )
      default:
        return (
          <Text> UNSUPPORTED OBJECT </Text>
        )
        return
    }
  }

  const renderSectionHeader = ({ section: { title } }: string) => {
    if (title && allSearchResults.find(sec => sec.title === title).data.length > 0) {
      return (<DivHeader text={title} />)
    } else {
      return (<></>)
    }
  }
 
  function PageContents() {
    if (searchQuery == '') {
      return (
        <FlatList
          // style={styles.pocketFlatList}
          contentContainerStyle={styles.pocketFlatList}
          horizontal
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          snapToAlignment='start'
          snapToInterval={Dimensions.get('window').width - (2 * POCKET_CARD_SCREEN_MARGIN - MARGIN)}

          ItemSeparatorComponent={PocketCarouselSeparator}

          data={pocketData.getAllPockets}
          renderItem={renderPocketCarouselCard}
        />
      )
    } else {
      return (
        <SectionList
          // style={styles.pocketFlatList}
          contentContainerStyle={styles.pocketSearchResultFlatList}

          // ItemSeparatorComponent={PocketListSeparator}

          sections={allSearchResults}
          keyExtractor={(item, index) => item + index}
          renderItem={renderSearchResult}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
        />
      )
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >

      <ScreenContainer>
        <PageContents />
      </ScreenContainer>

      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}

        inputStyle={styles.searchBarInput}
        placeholder="Search Pockets and Businesses"
        placeholderTextColor={colors.subtle}

        showCancel={true}
        cancelButtonTitle='cancel'

        onChangeText={setSearchQuery}
        value={searchQuery}
      />

    </KeyboardAvoidingView>
  )

}

