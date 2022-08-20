import { FlatList, Pressable } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { BusinessCardSm, BusinessCardSuggested, DivHeader } from '../components/Cards';
import { BusinessCard } from '../components/Cards';

import { colors } from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { useState } from 'react';

const R = require('ramda');

export default function PayTabScreen({ navigation }: { navigation: any }) {

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

  const renderBusinessCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <BusinessCardSm
      key={item.busID}
      navigation={navigation}
      business={item}
    />
  )

  return (
    <>
      <SearchBar
        showCancel={false}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}

        inputStyle={styles.searchBarInput}
        placeholder="Search Businesses"
        placeholderTextColor={colors.subtle}

        onChangeText={updateSearch}
        onClear={() => null}
        value={searchQuery}
      />
      <ScreenContainer>
        <FlatList
          contentContainerStyle={styles.businessFlatList}
          data={searchResults}
          renderItem={renderBusinessCard}
          ListHeaderComponent={() => {
            if (searchQuery == '') {
              return (
                <>
                  <DivHeader text='Suggested' />
                  <Pressable
                    onPress={() => navigation.navigate('Business', {
                      business: businesses[0]
                    })}
                  >

                    <BusinessCardSuggested
                      key={businesses[0].busID}
                      navigation={navigation}
                      business={businesses[0]}
                    />
                  </Pressable>
                  <DivHeader text='Loved' />
                </>
              )
            } else {
              return (null)
            }


          }}
        />
      </ScreenContainer>

    </>

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