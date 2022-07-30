import { FlatList } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';
import { Component } from 'react';

const R = require('ramda');

export default class PocketScreen extends Component {

  // props: route, navigation


  state = {
    search: '',
  }

  renderBusinessCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (

    <BusinessCardSm
      key={item.busID}
      navigation={this.props.navigation}
      name={item.name}
      address={item.address}
      pocket={item.pocket}
      imageURL={item.imageURL}
      bio={item.bio}
      people={item.people}
    />

  )

  updateSearch = (search: string) => {
    this.setState({ search });
  };

  render() {
    // const {pocketname}  = this.props
    const { search } = this.state;

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
        <ScreenContainer>
          <FlatList
            contentContainerStyle={styles.businessFlatList}

            data={businesses}
            renderItem={this.renderBusinessCard}
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
}