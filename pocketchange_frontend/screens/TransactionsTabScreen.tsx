import { ScrollView, FlatList } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { transactions } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { TranactionCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';

const R = require('ramda');

export default function TransactionsTabScreen({ navigation }: { navigation: any }) {

  const state = {
    search: '',
  }


  const renderTransactionCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (

    <TranactionCardSm
      key={item.transactionID}
      navigation={navigation}
      transaction={item}
    />

  )

  const updateSearch = (search: string) => {
    state.search = search;
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
          data={transactions}
          renderItem={renderTransactionCard}
        />
      </ScreenContainer>
    </>

    //   <ScrollView
    //     style={styles.container}
    //   >
    //     {R.map(
    //       ({ businessID, name, address, pocket, imageURL }) => (
    //         <BusinessCardSm
    //           key={businessID}
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