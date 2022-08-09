import { FlatList, Image } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { BusinessCard, BusinessCardSm, DivHeader, PocketDetailCard } from '../components/Cards';

import { Text, View } from '../components/Themed';

const R = require('ramda');

export default function PocketScreen({ navigation, route }: { navigation: any, route: any }) {

  const pocket = route.params.pocket;

  const state = {
    search: '',
  }

  const renderBusinessCard = ({ item, index, separators }: any) => (

    <BusinessCardSm
      key={item.busID}
      navigation={navigation}
      business={item}
    />

  )

  const updateSearch = (search: string) => {
    state.search = search;
  };

  // const {pocketname}  = this.props
  const { search } = state;

  return (
    <>
      <ScreenContainer>

        <FlatList
          ListHeaderComponent={
            <>
              <PocketDetailCard
                navigation={navigation}
                pocket={pocket}
              />
              <DivHeader text='Businesses' />
            </>
          }
          contentContainerStyle={styles.businessFlatList}
          data={businesses}
          renderItem={renderBusinessCard}
        />
      </ScreenContainer>

      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        placeholder={'Search ' + pocket.name}
        onChangeText={updateSearch}
        onClear={{}}
        value={search}
      />
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