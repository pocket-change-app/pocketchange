import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, SectionList } from 'react-native';
import SearchBar from '../../components/SearchBar';
import { useHeaderHeight } from '@react-navigation/elements'
import { useCallback, useContext, useState } from 'react';

import { styles } from '../../Styles';
import { ScreenContainer } from '../../components/Themed';
import { TranactionCardSm } from '../../components/Cards';
import { Text } from '../../components/Themed';
import { useGetAllTransactionsQuery } from '../../hooks-apollo';
import { colors } from '../../constants/Colors';

import { AuthContext } from '../../contexts/Auth';
import wait, { waitTimes } from '../../utils/wait';

export default function TransactionsTabScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext);
  const businessID = authContext.activeRole.entityID



  const [searchQuery, setSearchQuery] = useState('')

  const [refreshing, setRefreshing] = useState(false)

  const { data: transactionsData, error: transactionsError, loading: transactionsLoading, refetch: refetchTransactions } = useGetAllTransactionsQuery(undefined, businessID)
  if (transactionsError) return (<Text>{transactionsError.message}</Text>)

  const searchResults = transactionsData?.getAllTransactions

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      refetchTransactions // once query is in
    ]).then(() => setRefreshing(false));
  }, []);

  // // TODO: remove hard coded value, get logged in business
  // const business = {
  //   businessID: '2b',
  //   businessName: 'La Paella',
  //   dateEstablished: '2015-01-01',
  //   phoneNumber: '416-000-000',
  //   website: 'paella.ca',
  //   businessType: 'restaurant',
  //   businessSubtype: 'spanish',
  //   emailAddress: 'paella@gmail.com',
  //   address: {
  //     streetName: 'Queen St E',
  //     buildingNumber: '1146',
  //     unitNumber: '',
  //     city: 'Toronto',
  //     region: 'ON',
  //     postalCode: 'M4M 1L1',
  //   },
  //   latitude: 43.6625197,
  //   longitude: -79.336471,
  //   businessTags: [],
  //   stripeID: '2b',
  //   description: 'La Paella was originally a Spanish catering company in the GTA that was started in 2010 by partners, Gabriel and Angel.  They decided to open a storefront location in Leslieville in 2017.',
  //   deactivated: false,
  // };





  // if(R.isNil(allTransactions) ){
  //   return null
  // }




  const renderTransactionCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => {

    // console.log('rendering transaction');

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
      keyboardVerticalOffset={useHeaderHeight()}
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
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search Transactions"
      />

    </KeyboardAvoidingView>

  )

}