import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, RefreshControl } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses, contestData, contests, contestsData, snapItUp } from '../dummy';
import { ScreenContainer } from '../components/Themed';

import { BusinessCard, BusinessCardSm, ChangeBalanceCard, ContestCard, DivHeader, PocketDetailCard } from '../components/Cards';
import { useGetAllBusinessesQuery, usePocketQuery } from '../hooks-apollo';
import { Text, View } from '../components/Themed';
import * as R from 'ramda-adjunct';
import { useCallback, useContext, useState } from 'react';
import { colors } from '../constants/Colors';
import { AuthContext } from '../contexts/Auth';


import ChangeBalanceQueries from '../hooks-apollo/ChangeBalance/queries'
import { connectAuthEmulator } from 'firebase/auth';
import useGetAllChangeBalancesQuery from '../hooks-apollo/ChangeBalance/useGetAllChangeBalancesQuery';
import { QueryResult } from '../components/QueryResult';
import wait, { waitTimes } from '../utils/wait';


export default function PocketScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext); 

  const contestData = { contest: contestsData.getAllContests[0] }

  const pocket = route.params.pocket;
  const pocketID = pocket.pocketID

  const { data: businessesData, loading: businessesLoading, error: businessesError, refetch: refetchBusinesses } =  useGetAllBusinessesQuery(pocketID)
  if (businessesError) return (<Text>{businessesError.message}</Text>)

  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError, refetch: refetchChangeBalances } = useGetAllChangeBalancesQuery(authContext.userFirebase.uid, pocketID);
  if (changeBalanceError) return (<Text>{changeBalanceError.message}</Text>)
  // const { data: pocketData, loading: pocketLoading, error: pocketError, refetch: refetchPocket } = usePocketQuery(pocketID)

  const [searchQuery, setSearchQuery] = useState('')

  const searchResults = businessesData?.getAllBusinesses?.filter(
    b => b.businessName.toLowerCase().includes(
      searchQuery.toLowerCase().trim()
    )
  )

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      refetchBusinesses,
      refetchChangeBalances,
    ]).then(() => setRefreshing(false));
  }, []);


  const renderBusinessCard = ({ item, index, separators }: any) => (

    <BusinessCardSm
      // key={item.businessID}
      navigation={navigation}
      businessID={item.businessID}
      showPocket={false}
    />

  )

  // useEffect(() => {
  //   updateSearch('')
  // }, [loading])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScreenContainer>

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={() => {
            if (searchQuery == '') {
              return (
                <>
                  <PocketDetailCard
                    navigation={navigation}
                    pocketID={pocketID}
                  />
                  {
                    //TODO: make this not hard coded                    
                  }
                  {(pocket.pocketID === "2p")
                    ? (
                      <ContestCard
                        navigation={navigation}
                        contestID={contestData?.contest?.contestID}
                      />
                    ) : (null)
                  }
                  
                  <QueryResult loading={changeBalanceLoading} error={changeBalanceError} data={changeBalanceData}>
                    {
                      (changeBalanceData?.getAllChangeBalances?.length != 0) ? (
                        <ChangeBalanceCard 
                          pocketID={pocketID}
                        />
                      ) : (null)
                    }
                  </QueryResult>

                  <DivHeader text='Businesses' />
                </>
              )
            } else {
              return (null)
            }
          }}
          contentContainerStyle={styles.businessFlatList}
          data={searchResults}
          renderItem={renderBusinessCard}
          ListFooterComponent={businessesLoading ? <ActivityIndicator size="large" color={colors.subtle} style={{margin: 10}}/> : <></>}
        />

         
      </ScreenContainer>

      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        placeholder={'Search ' + pocket.pocketName}
        placeholderTextColor={colors.subtle}

        onChangeText={setSearchQuery}
        onClear={() => null}
        value={searchQuery}
      />
    </KeyboardAvoidingView>

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