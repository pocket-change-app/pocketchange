import { FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Pressable, TextInput } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { BusinessCardSm, BusinessCardSuggested, DivHeader } from '../components/Cards';
import { BusinessCard } from '../components/Cards';

import { colors } from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import { HorizontalLine } from '../components/Lines';

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
    <Pressable
      onPress={() => navigation.navigate('BusinessModal', {
        business: item
    })}
    >
      <BusinessCardSm
        key={item.busID}
        navigation={navigation}
        business={item}
      />
    </Pressable>
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >

      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <ScreenContainer>

        {/* <View style={{ flexGrow: 1 }}> */}
        {/* <HorizontalLine /> */}
        <FlatList
          contentContainerStyle={[styles.businessFlatList, { flexGrow: 1 }]}
          data={searchResults}
          renderItem={renderBusinessCard}
          ListHeaderComponent={() => {
            if (searchQuery == '') {
              return (
                <>
                  <DivHeader text='Suggested' />
                  {/* <Pressable
                    onPress={() => navigation.navigate('Business', {
                      business: businesses[0]
                    })}
                  > */}

                  <BusinessCardSuggested
                    key={businesses[0].busID}
                    navigation={navigation}
                    business={businesses[0]}
                  />
                  {/* </Pressable> */}
                  <DivHeader text='Loved' />
                </>
              )
            } else {
              return (null)
            }
          }}
        />
        {/* <HorizontalLine /> */}
        {/* </View> */}

      </ScreenContainer>
      {/* </TouchableWithoutFeedback> */}

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