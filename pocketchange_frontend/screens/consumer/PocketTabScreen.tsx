import { FlatList, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator, SectionList, SafeAreaView, Keyboard } from 'react-native';
import { SearchBar } from '@rneui/themed';

import { styles, MARGIN, POCKET_CARD_SCREEN_MARGIN } from '../../Styles';
import { BusinessCardSm, DivHeader, PocketCarouselCard, PocketCarouselSeparator, PocketSearchResult } from "../../components/Cards";
import { Text, View } from '../../components/Themed';
import { ScreenContainer } from '../../components/Themed';
import { useContext, useState } from 'react';
import { colors } from '../../constants/Colors';
import { AuthContext } from '../../contexts/Auth';
import { useGetAllBusinessesQuery, useGetAllPocketsQuery } from '../../hooks-apollo';
import FloatingTitle from '../../components/FloatingTitle';


// const R = require('ramda');


export default function PocketTabScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState('')

  const { data: businessesData, loading: businessesLoading, error: businessesError, refetch: refetchBusinesses } = useGetAllBusinessesQuery(undefined);
  const { data: pocketData, loading: pocketLoading, error: pocketError, refetch: refetchPockets } = useGetAllPocketsQuery(undefined);

  // const [refreshingSearchResults, setRefreshingSearchResults] = useState(false)

  // const onRefreshSearchResults = useCallback(() => {
  //   setRefreshingSearchResults(true);
  //   Promise.all([
  //     wait(waitTimes.RefreshScreen),
  //     refetchBusinesses,
  //     refetchPockets,
  //   ]).then(() => setRefreshingSearchResults(false));
  // }, []);

  const pocketSearchResults = pocketData?.getAllPockets?.filter(
    p => p.pocketName.toLowerCase().includes(
      searchQuery.toLowerCase().trim()
    )
  )

  const businessSearchResults = businessesData?.getAllBusinesses?.filter(
    b => b.businessName.toLowerCase().includes(
      searchQuery.toLowerCase().trim()
    )
  )


  let allSearchResults: any[] = [
    { title: null, data: [] },
    { title: 'Businesses', data: [] }
  ]

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

  const renderPocketCarouselCard = ({ item }) => (
    <PocketCarouselCard
      key={item.pocketID}
      navigation={navigation}
      pocket={item}
    />
  )

  const renderSearchResult = ({ item, index, separators }: any) => {
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
            businessID={item.businessID}
          />
        )
      default:
        return (
          <Text> UNSUPPORTED OBJECT </Text>
        )
        return
    }
  }

  const renderSectionHeader = ({ section: { title, data } }: { section: { title: string, data: any[] } }) => {
    if (title && data.length > 0) {
      return (<DivHeader text={title} />)
    } else {
      return (null)
    }
  }

  const PageContents = () => {
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

          data={pocketData?.getAllPockets}
          renderItem={renderPocketCarouselCard}
        />
      )
    } else {
      return (
        <ScreenContainer>
          <SectionList
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshingSearchResults}
            //     onRefresh={onRefreshSearchResults}
            //   />
            // }
            // style={styles.pocketFlatList}
            contentContainerStyle={styles.pocketSearchResultFlatList}

            // ItemSeparatorComponent={PocketListSeparator}

            sections={allSearchResults}
            keyExtractor={(item, index) => item + index}
            renderItem={renderSearchResult}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
          />
        </ScreenContainer>
      )
    }
  }

  if (businessesError) return (<Text>{businessesError.message}</Text>)
  if (pocketError) return <Text>{pocketError.message}</Text>;
  if (pocketLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />
  if (!pocketData) return <Text>Error: pocketData empty.</Text>

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >


      {/* WITH TITLE */}

      {/* <SafeAreaView style={{ flex: 1 }}>
        <ScreenContainer>

          <View style={{ marginVertical: MARGIN }}>
            <PageContents />
          </View>

          <FloatingTitle text='Pockets' />

        </ScreenContainer>
      </SafeAreaView> */}


      {/* NO TITLE */}

      <SafeAreaView style={{ flex: 1 }}>

        <PageContents />

      </SafeAreaView>



      <SearchBar
        selectionColor={colors.gold}
        platform='ios'
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}

        inputStyle={styles.searchBarInput}
        placeholder="Search Pockets and Businesses"
        placeholderTextColor={colors.subtle}

        // showCancel={true}
        // cancelButtonTitle='Cancel'
        cancelButtonProps={{ color: colors.subtle }}

        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </KeyboardAvoidingView>
  )

}

