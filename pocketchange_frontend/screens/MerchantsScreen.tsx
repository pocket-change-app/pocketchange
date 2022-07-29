import { ScrollView, FlatList } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';
import { Component } from 'react';

const R = require('ramda');

export default class MerchantsScreen extends Component {
  state = {
    search: '',
  }


  // const renderBusinessCard = (busId: string, name: string, address: string, pocket: string, imageURL: string) => (
  //   <BusinessCardSm
  //     key={busId}
  //     navigation={navigation}
  //     name={name}
  //     address={address}
  //     pocket={pocket}
  //     imageURL={imageURL}
  //   />
  // )

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
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
        <FlatList
          contentContainerStyle={styles.businessFlatList}

          data={businesses}
          renderItem={({ item, index, separators }) => (

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

          )}
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
}