import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses, snapItUp } from '../dummy';
import { ScreenContainer } from '../components/Themed';

import { BusinessCard, BusinessCardSm, ChangeBalanceCard, ContestCard, DivHeader, PocketDetailCard } from '../components/Cards';
import { useGetAllBusinessesQuery } from '../hooks-apollo';
import { Text, View } from '../components/Themed';
import * as R from 'ramda-adjunct';
import React, { useContext, useEffect, useState } from 'react';
import { colors } from '../constants/Colors';
import { AuthContext } from '../contexts/Auth';


import ChangeBalanceQueries from '../hooks-apollo/ChangeBalance/queries'
import { connectAuthEmulator } from 'firebase/auth';
import useGetAllChangeBalancesQuery from '../hooks-apollo/ChangeBalance/useGetAllChangeBalancesQuery';
import { QueryResult } from '../components/QueryResult';



export default function PocketScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext); 

  const pocket = route.params.pocket;

  const pocketID = pocket.pocketID
  const {allBusinesses, loading: businessesLoading} =  useGetAllBusinessesQuery(pocketID)

  const [searchQuery, setSearchQuery] = useState('')

  const searchResults = allBusinesses.filter(
    b => b.businessName.toLowerCase().includes(
      searchQuery.toLowerCase().trim()
    )
  )

// function searchFilter(text: string) {
//   const formattedQuery = text.toLowerCase().trim()
//   return (
//     allBusinesses.filter(
//       b => b.businessName.toLowerCase().includes(formattedQuery)
//     )
//   )
// }


  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError, refetch: refetchChangeBalances } = useGetAllChangeBalancesQuery(authContext.userFirebase.uid, pocket.pocketID);

  const renderBusinessCard = ({ item, index, separators }: any) => (

    <BusinessCardSm
      // key={item.businessID}
      navigation={navigation}
      business={item}
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
          ListHeaderComponent={() => {
            if (searchQuery == '') {
              return (
                <>
                  <PocketDetailCard
                    navigation={navigation}
                    pocket={pocket} />
                  {
                    //TODO: make this not hard coded                    
                  }
                  {(pocket.pocketID === "2p") ? 
                    <ContestCard
                    navigation={navigation}
                    contest={snapItUp} /> : null}
                  
                  <QueryResult loading={changeBalanceLoading} error={changeBalanceError} data={changeBalanceData}>
                    {changeBalanceData?.getAllChangeBalances?.length != 0 ?
                      <ChangeBalanceCard
                        changeBalance={changeBalanceData?.getAllChangeBalances} 
                        pocket={pocket} /> : null
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