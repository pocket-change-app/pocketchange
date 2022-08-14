import { SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles, MARGIN, POCKET_CARD_SCREEN_MARGIN } from '../Styles';
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
      <ScreenContainer>
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
      </ScreenContainer>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        // round
        placeholder="Search Pockets"
        onChangeText={updateSearch}
        value={search}
      />
    </>
  )

}

