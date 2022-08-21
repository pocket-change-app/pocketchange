import { FlatList, Image, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { BusinessCard, BusinessCardSm, DivHeader, PocketDetailCard } from '../components/Cards';

import { Text, View } from '../components/Themed';
import { useState } from 'react';
import { colors } from '../constants/Colors';


const R = require('ramda');

export default function PocketScreen({ navigation, route }: { navigation: any, route: any }) {

  const pocket = route.params.pocket;

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(businesses)

  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setSearchResults(() => {
      const formattedQuery = text.toLowerCase().trim()
      const results = businesses.filter(b => b.name.toLowerCase().includes(formattedQuery))
      return results
    })
  };

  const renderBusinessCard = ({ item, index, separators }: any) => (

    <BusinessCardSm
      key={item.busID}
      navigation={navigation}
      business={item}
    />

  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScreenContainer>

        <FlatList
          ListHeaderComponent={() => {
            if (searchQuery == '') {
              return (
                <>
                  <PocketDetailCard
                    navigation={navigation}
                    pocket={pocket}
                  />
                  <DivHeader text='Businesses' />
                </>
              )
            } else {
              return (null)
            }
          }}
          contentContainerStyle={styles.businessFlatList}
          data={searchResults}
          renderItem={renderBusinessCard}
        />
      </ScreenContainer>

      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        placeholder={'Search ' + pocket.name}
        placeholderTextColor={colors.subtle}

        onChangeText={updateSearch}
        onClear={() => null}
        value={searchQuery}
      />
    </KeyboardAvoidingView>

    //   <ScrollView
    //     style={styles.container}
    //   >
    //     {R.map(
    //       ({ busID, name, address, pocket, imageURL }) => (
    //         <BusinessCardSm
    //           key={busID}
    //           navigation={navigation}
    //           name={name}
    //           address={address}
    //           pocket={pocket}
    //           imageURL={imageURL}
    //         />
    //       ), businesses
    //     )}
    //   </ScrollView>
    // );
  )
}