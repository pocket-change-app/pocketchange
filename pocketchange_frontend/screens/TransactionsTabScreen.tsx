import { ScrollView, FlatList, KeyboardAvoidingView, Pressable, Image } from 'react-native';
import { SearchBar } from '@rneui/base';
import { useContext, useState } from 'react';

import { styles, MARGIN } from '../Styles';
//import { transactions } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { DivHeader, TranactionCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';
import { useGetAllTransactionsQuery } from '../hooks-apollo';
import { colors } from '../constants/Colors';


import { isNilOrEmpty } from 'ramda-adjunct';
import { AuthContext } from '../contexts/Auth';
const R = require('ramda');

export default function TransactionsTabScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext); 

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


  const {allTransactions, error, loading} =  useGetAllTransactionsQuery(undefined, business.businessID)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState('')

  if(R.isNil(allTransactions) ){
    return null
  }

  // TODO: search wont work unitl we find a way to use the users names 
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

      <View style={{padding: MARGIN,}}>
      
      <View style={styles.businessModalInfo}>
        <Text style={styles.businessNameLg}>{business.businessName}</Text>
        <Text style={styles.address}>{business.address.buildingNumber} { business.address.streetName}</Text>
        <Text style={styles.pocket}>{"TODO: business pocket"}</Text>

        <Pressable style={styles.payButton}
          onPress={() => (navigation.navigate('PaymentModalStack', {
            screen: "PayAmount",
            params: {
              // navigation: navigation,
              business: business,
            }
            // businessID: business.businessID,
            // name: business.name,
            // address: business.address,
            // pocket: business.pocket,
            // imageURL: business.imageURL,
          }))}
        >
          <Text style={styles.payButtonText}>NEW TRANSACTION</Text>
        </Pressable>

      </View>
    </View>

    <DivHeader text="Transaction History"/>
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
                placeholder="Search Transactions"
                placeholderTextColor={colors.subtle}

                onChangeText={updateSearch}
                onClear={() => null}
                value={searchQuery}
            />
    </KeyboardAvoidingView>

  )

}