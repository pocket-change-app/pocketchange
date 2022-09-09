import { ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from '@rneui/base';
import { useState } from 'react';

import { styles } from '../Styles';
//import { transactions } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { TranactionCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';
import { useGetAllTransactionsQuery } from '../hooks-apollo';
import { colors } from '../constants/Colors';


import { isNilOrEmpty } from 'ramda-adjunct';
const R = require('ramda');

export default function TransactionsTabScreen({ navigation }: { navigation: any }) {

  // TODO: remove hard coded value, get logged in business
  const businessID = '1b'


  const {allTransactions, error, loading} =  useGetAllTransactionsQuery(undefined, businessID)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState('')

  if(R.isNil(allTransactions) ){
    return null
  }

  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setSearchResults(() => {
        const formattedQuery = text.toLowerCase().trim()
        const results = allTransactions.filter(t => t.userID.toLowerCase().includes(formattedQuery))
        return results
    })
};


  const renderTransactionCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (

    <TranactionCardSm
      key={item.transactionID}
      navigation={navigation}
      transaction={item}
    />

  )
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}>

      <ScreenContainer>

        {isNilOrEmpty(allTransactions) ? null : <>

          <FlatList
            contentContainerStyle={styles.businessFlatList}
            data={(!searchResults) ? allTransactions : searchResults}
            renderItem={renderTransactionCard}
          />

        </>}

      </ScreenContainer>

      <SearchBar
                showCancel={false}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}

                inputStyle={styles.searchBarInput}
                placeholder="Search Customers"
                placeholderTextColor={colors.subtle}

                onChangeText={updateSearch}
                onClear={() => null}
                value={searchQuery}
            />
    </KeyboardAvoidingView>

  )

}