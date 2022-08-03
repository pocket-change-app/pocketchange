import { SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles, MARGIN } from '../Styles';
import { pockets } from '../dummy';
import { PocketListCard, PocketListSeparator } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { ScreenContainer } from '../components/Themed';

const R = require('ramda');


export default function PocketTabScreen({ navigation, route }: { navigation: any, route: any }) {
  const state = {
    search: '',
  }

  const updateSearch = (search: string) => {
    state.search = search;
  };


  const { search } = state

  return (
    <>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        round
        placeholder="Search Pockets"
        onChangeText={updateSearch}
        value={search}
      />
      <ScreenContainer>
        <FlatList
          style={styles.pocketFlatList}
          horizontal
          decelerationRate={0}
          showsHorizontalScrollIndicator={true}
          snapToAlignment='start'
          snapToInterval={Dimensions.get('window').width - 3 * MARGIN}


          ItemSeparatorComponent={PocketListSeparator}

          data={pockets}
          renderItem={({ item, index, separators }) => (
            <PocketListCard
              key={item.pocketID}
              navigation={navigation}
              name={item.name}
              imageURL={item.imageURL}
            />
          )
          }
        />
      </ScreenContainer>
    </>
  )

}

