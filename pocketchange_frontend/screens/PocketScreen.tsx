import { SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles, MARGIN } from '../Styles';
import { pockets } from '../dummy';
import { PocketListCard } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { ScreenContainer } from 'react-native-screens';
import { Component } from 'react';

const R = require('ramda');





export default class PocketScreen extends Component {
  state = {
    search: '',
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {

    const search = this.state

    return (
      <>
        <SearchBar
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.searchBarInput}
          round
          placeholder="Search Merchants"
          onChangeText={this.updateSearch}
          value={search}
        />
        <FlatList
          style={{ paddingBottom: 0 }}
          // horizontal
          // pagingEnabled={true}
          // contentInsetAdjustmentBehavior="never"
          decelerationRate='fast'
          snapToAlignment='center'

          horizontal
          // pagingEnabled = { true}
          showsHorizontalScrollIndicator={false}
          // legacyImplementation={false}
          snapToInterval={Dimensions.get('window').width - 2 * MARGIN}

          data={pockets}
          renderItem={({ item, index, separators }) => (
            <PocketListCard
              key={item.pocketID}
              navigation={this.props.navigation}
              name={item.name}
              imageURL={item.imageURL}
            />
          )
          }
        />
      </>
    )
  }
}

