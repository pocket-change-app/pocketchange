import { FlatList, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator, SectionList, SafeAreaView, Keyboard, Image, Pressable } from 'react-native';

import { styles, MARGIN, POCKET_CARD_SCREEN_MARGIN, CARD_RADIUS } from '../../Styles';
import { BusinessCardSm, DivHeader, PocketCarouselSeparator, PocketSearchResult } from "../../components/Cards";
import { Text, View } from '../../components/Themed';
import { ScreenContainer } from '../../components/Themed';
import { useContext, useRef, useState } from 'react';
import { colors } from '../../constants/Colors';
import { AuthContext } from '../../contexts/Auth';
import { useGetAllBusinessesQuery, useGetAllPocketsQuery } from '../../hooks-apollo';
import SearchBar from '../../components/SearchBar';
import { useHeaderHeight } from '@react-navigation/elements'
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import PocketCarouselCard from '../../components/PocketCarouselCard';



// const R = require('ramda');

const MapCard = () => {

  const authContext = useContext(AuthContext)
  const navigation = useNavigation() // accesses the navigation object from the parent, I think

  // passed to MapScreen to center on current user location
  const mapCenter = useRef<{ latitude: number, longitude: number }>(authContext.location.coords)

  return (
    <Pressable
      onPress={() => navigation.navigate('Map', {
        center: mapCenter.current,
      })}
      style={{ marginRight: MARGIN }}
    >
      <View style={styles.pocketListCardContainer}>
        <View style={[styles.card, styles.pocketListCard]}>
          {/* <View style={styles.pocketListNameContainer}>
          <Text style={styles.pocketListName}>{pocket.name}</Text>
        </View> */}

          <View style={[styles.card, { flex: 1, padding: MARGIN / 2, justifyContent: 'center', marginBottom: 0 }]}>

            <View style={[styles.card, {
              zIndex: 10,
              position: 'absolute',
              top: MARGIN / 2,
              left: MARGIN / 2,
              paddingTop: MARGIN / 2,
              paddingLeft: MARGIN / 2,
              paddingRight: MARGIN,
              paddingBottom: MARGIN,

              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRadius: 0,
              borderBottomRightRadius: CARD_RADIUS,
            }]}>
              <Text style={styles.navigationHeaderTitle}>
                In your area
              </Text>
            </View>

            <MapView
              style={[styles.image, styles.pocketListImage, { borderRadius: CARD_RADIUS - MARGIN / 2 }]}
              scrollEnabled={false}
              showsUserLocation
              followsUserLocation
              mapType='mutedStandard'
              onRegionChange={(region, details) => {
                mapCenter.current = {
                  latitude: region.latitude,
                  longitude: region.longitude
                }
              }}
            >

            </MapView>

          </View>
        </View>
      </View>
    </Pressable>
  )
}


export default function PocketTabScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState('')
  // const [tabText, setTabText] = useState('Pockets')
  // const xOffset = useRef(0)

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
    { title: 'Pockets', data: [] },
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

  const SearchResultSeparator = () => (
    <View style={{ height: MARGIN }} />
  )

  const renderSectionHeader = ({ section: { title, data } }: { section: { title: string, data: any[] } }) => {
    if (title && data.length > 0) {
      return (<DivHeader text={title} />)
    } else {
      return (null)
    }
  }

  // const onScroll = (e) => {
  //   if (xOffset.current <= 0 && e.nativeEvent.contentOffset.x > 0) {
  //     // case when user just started scrolling down from the top
  //   } else if (xOffset.current > 0 && e.nativeEvent.contentOffset.x <= 0) {
  //     setTabText('Map')
  //   }
  //   xOffset.current = e.nativeEvent.contentOffset.x;
  //   // console.log(xOffset.current);
  // }

  const PageContents = () => {
    if (!searchQuery) {
      return (
        <SafeAreaView style={{ flex: 1 }} >

          {/* <HorizontalLine />
          <View style={{ height: MARGIN }} /> */}
          {/* <FloatingTitle text={'Pockets'} /> */}

          <FlatList
            // style={styles.pocketFlatList}
            // pagingEnabled
            initialScrollIndex={1}  // TODO: UNCOMMENT
            // contentOffset={{
            //   x: Dimensions.get('screen').width - 2 * POCKET_CARD_SCREEN_MARGIN + MARGIN,
            //   y: 0
            // }}
            contentContainerStyle={styles.pocketFlatList}
            horizontal
            decelerationRate={0}
            showsHorizontalScrollIndicator={false}
            snapToAlignment='start'
            snapToInterval={Dimensions.get('window').width - (2 * POCKET_CARD_SCREEN_MARGIN - MARGIN)}

            data={pocketData?.getAllPockets}
            renderItem={renderPocketCarouselCard}
            ListHeaderComponent={MapCard}
            ItemSeparatorComponent={PocketCarouselSeparator}

            // onScroll={onScroll}

            /** Defining a getItemLayout is necessary for things like
             * initialScrollIndex to work properly */
            getItemLayout={(data, index) => ({
              length: Dimensions.get('screen').width - 2 * POCKET_CARD_SCREEN_MARGIN,
              offset: (Dimensions.get('screen').width - 2 * POCKET_CARD_SCREEN_MARGIN + MARGIN) * (index),
              index: index
            })}
          />

        </SafeAreaView>
      )
    } else {
      return (
        <ScreenContainer>
          <SectionList
            // inverted
            contentContainerStyle={styles.container}

            ItemSeparatorComponent={SearchResultSeparator}
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
      keyboardVerticalOffset={useHeaderHeight()}
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
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder='Search Pockets and Businesses'
      />

    </KeyboardAvoidingView>
  )

}

