import { ScrollView, FlatList } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';
import { Component } from 'react';

const R = require('ramda');

export default function MerchantsScreen({ navigation }: { navigation: any }) {

  const state = {
    search: '',
  }

  const renderBusinessCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <BusinessCardSm
      key={item.busID}
      navigation={navigation}
      name={item.name}
      address={item.address}
      pocket={item.pocket}
      imageURL={item.imageURL}
      bio={item.bio}
      people={item.people}
    />
  )

  const updateSearch = (search: string) => {
    state.search = search
  };

  const { search } = state;

  return (
    <>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        round
        placeholder="Search Merchants"
        onChangeText={updateSearch}
        value={search}
      />
      <ScreenContainer>
        <FlatList
          contentContainerStyle={styles.businessFlatList}

          data={businesses}
          renderItem={renderBusinessCard}
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