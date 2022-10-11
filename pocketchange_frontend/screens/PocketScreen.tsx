import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses, snapItUp } from '../dummy';
import { ScreenContainer } from '../components/Themed';

import { BusinessCard, BusinessCardSm, ChangeBalanceCard, CompetitionCard, DivHeader, PocketDetailCard } from '../components/Cards';
import { useGetAllBusinessesQuery } from '../hooks-apollo';
import { Text, View } from '../components/Themed';
import * as R from 'ramda';
import React, { useContext, useState } from 'react';
import { colors } from '../constants/Colors';
import { AuthContext } from '../contexts/Auth';


import { useQuery } from '@apollo/client';
import ChangeBalanceQueries from '../hooks-apollo/ChangeBalance/queries'
import { connectAuthEmulator } from 'firebase/auth';



export default function PocketScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext); 

  const pocket = route.params.pocket;

  const pocketID = pocket.pocketID
  const {allBusinesses, loading} =  useGetAllBusinessesQuery(pocketID)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(allBusinesses)

  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setSearchResults(() => {
      const formattedQuery = text.toLowerCase().trim()
      const results = allBusinesses.filter(b => b.businessName.toLowerCase().includes(formattedQuery))
      return results
    })
  };

  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError } = useQuery(ChangeBalanceQueries.getAllChangeBalances, { variables: { userID: authContext.userFirebase.uid, pocketID: pocket.pocketID} });
  if (changeBalanceError) return <Text>{changeBalanceError}</Text>;
  if (changeBalanceLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{margin: 10}}/>

  const renderBusinessCard = ({ item, index, separators }: any) => (

    <BusinessCardSm
      key={item.businessID}
      navigation={navigation}
      business={item}
      showPocket={false}
    />

  )
  if(R.isNil(allBusinesses) ){
    return null
  }
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

                  <CompetitionCard
                    navigation={navigation}
                    competition={snapItUp} />
                  
                  <ChangeBalanceCard
                    changeBalance={changeBalanceData.getAllChangeBalances} 
                    pocket={pocket} />

                  <DivHeader text='Businesses' />
                </>
              )
            } else {
              return (null)
            }
          }}
          contentContainerStyle={styles.businessFlatList}
          data={allBusinesses}
          renderItem={renderBusinessCard}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color={colors.subtle} style={{margin: 10}}/> : <></>}
        />

         
      </ScreenContainer>

      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        placeholder={'Search ' + pocket.pocketName}
        placeholderTextColor={colors.subtle}

        onChangeText={updateSearch}
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