import { SafeAreaView, FlatList, ScrollView, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles, MARGIN, POCKET_CARD_SCREEN_MARGIN } from '../Styles';
import { pockets } from '../dummy';
import { PocketListCard, PocketListSeparator, PocketSearchResult } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { ScreenContainer } from '../components/Themed';
import React, { useContext, useState } from 'react';
import { colors } from '../constants/Colors';
import { AuthContext } from '../contexts/Auth';
import { useQuery } from '@apollo/client';
import PocketQueries from '../hooks-apollo/Pocket/queries'

const R = require('ramda');


export default function PocketTabScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext); 

  const [searchQuery, setSearchQuery] = useState('')
  const [pocketSearchResults, setPocketSearchResults] = useState()

  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setPocketSearchResults(() => {
      const formattedQuery = text.toLowerCase().trim()
      const results = pocketData.getAllPockets.filter(p => p.pocketName.toLowerCase().includes(formattedQuery))
      return results
    })
  };


  const { data: pocketData, loading: pocketLoading, error: pocketError } = useQuery(PocketQueries.getAllPockets, { variables: { } });
  if (pocketError) return <Text>{pocketError.message}</Text>;
  if (pocketLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{margin: 10}}/>
  
 
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

          ItemSeparatorComponent={PocketListSeparator}

          data={pocketData.getAllPockets}
          renderItem={({ item, index, separators }) => (
            <PocketListCard
              key={item.pocketID}
              navigation={navigation}
              pocket={item}
            />
          )
          }
        />
      )
    } else {
      return (
        <FlatList
          // style={styles.pocketFlatList}
          contentContainerStyle={styles.pocketSearchResultFlatList}

          // ItemSeparatorComponent={PocketListSeparator}

          data={pocketSearchResults}
          renderItem={({ item, index, separators }) => (
            <PocketSearchResult
              key={item.pocketID}
              navigation={navigation}
              pocket={item}
            />
          )
          }
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
        // round
        placeholder="Search Pockets"
        placeholderTextColor={colors.subtle}

        onChangeText={updateSearch}
        value={searchQuery}
      />

    </KeyboardAvoidingView>
  )

}

