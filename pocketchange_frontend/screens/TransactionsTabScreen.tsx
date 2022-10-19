import { ScrollView, FlatList, KeyboardAvoidingView, Pressable, Image, RefreshControl } from 'react-native';
import { SearchBar } from '@rneui/base';
import { useCallback, useContext, useState } from 'react';

import { styles, MARGIN } from '../Styles';
//import { transactions } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { DivHeader, TranactionCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';
import { useGetAllTransactionsQuery } from '../hooks-apollo';
import { colors } from '../constants/Colors';


import { isNilOrEmpty } from 'ramda-adjunct';
import { AuthContext } from '../contexts/Auth';
import wait, { waitTimes } from '../utils/wait';
// const R = require('ramda');

export default function TransactionsTabScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext); 

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      // refetchTransactions // once query is in
    ]).then(() => setRefreshing(false));
  }, []);

  // TODO: remove hard coded value, get logged in business
  const business = {
    businessID: '2b',
    businessName: 'La Paella',
    dateEstablished: '2015-01-01',
    phoneNumber: '416-000-000',
    website: 'paella.ca',
    businessType: 'restaurant',
    businessSubtype: 'spanish',
    emailAddress:'paella@gmail.com',
    address: {
     streetName: 'Queen St E',
     buildingNumber: '1146', 
     unitNumber: '',
     city: 'Toronto',
     region: 'ON',
     postalCode: 'M4M 1L1',
    },
    latitude: 43.6625197,
    longitude: -79.336471,
    businessTags: [],
    stripeID: '2b',
    description: 'La Paella was originally a Spanish catering company in the GTA that was started in 2010 by partners, Gabriel and Angel.  They decided to open a storefront location in Leslieville in 2017.',
    deactivated: false,
 };


  const { data: transactionsData, error: transactionsError, loading: transactionsLoading, refetch: refetchTransactions } = useGetAllTransactionsQuery(undefined, business.businessID)
  const [searchQuery, setSearchQuery] = useState('')

  const searchResults = transactionsData?.getAllTransactions?.filter(
    t => {
      return true
      // t.userName.toLowerCase().includes(
      //   searchQuery.toLowerCase().trim()
      // )
    }
  )

  // if(R.isNil(allTransactions) ){
  //   return null
  // }

  // TODO: search wont work unitl we find a way to use the users names 
  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setSearchResults(() => {
        const formattedQuery = text.toLowerCase().trim()
      const results = transactionsData?.getAllTransactions?.filter(t => t.userID.toLowerCase().includes(formattedQuery))
        return results
    })
};


  const renderTransactionCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => {

    console.log('rendering transaxtion');

    return (
    <TranactionCardSm
      key={item.transactionID}
      navigation={navigation}
      transaction={item}
      />
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}>

      <ScreenContainer>

        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          // ListHeaderComponent={<DivHeader text="Transaction History" />}
          contentContainerStyle={styles.businessFlatList}
          data={searchResults}
          renderItem={renderTransactionCard}
        />

      </ScreenContainer>

      <SearchBar
                showCancel={false}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}

                inputStyle={styles.searchBarInput}
                placeholder="Search Transactions"
                placeholderTextColor={colors.subtle}

        onChangeText={setSearchQuery}
                onClear={() => null}
                value={searchQuery}
            />
    </KeyboardAvoidingView>

  )

}