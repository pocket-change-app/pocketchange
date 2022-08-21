import { SafeAreaView, FlatList, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles, MARGIN, POCKET_CARD_SCREEN_MARGIN } from '../Styles';
import { pockets } from '../dummy';
import { PocketListCard, PocketListSeparator, PocketSearchResult } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { ScreenContainer } from '../components/Themed';
import { useState } from 'react';
import { colors } from '../constants/Colors';

const R = require('ramda');


export default function PocketTabScreen({ navigation, route }: { navigation: any, route: any }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(pockets)

  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setSearchResults(() => {
      const formattedQuery = text.toLowerCase().trim()
      const results = pockets.filter(p => p.name.toLowerCase().includes(formattedQuery))
      return results
    })
  };

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

          data={pockets}
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

          data={searchResults}
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

