import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native';
import SearchBar from '../../components/SearchBar';
import { useHeaderHeight } from '@react-navigation/elements'

import { MARGIN, styles } from '../../Styles';
import { contestsData } from '../../dummy';
import { ScreenContainer } from '../../components/Themed';

import { BusinessCardSm, ChangeBalanceCard, ContestCard, DivHeader, PocketDetailCard } from '../../components/Cards';
import { useGetAllBusinessesQuery, usePocketQuery } from '../../hooks-apollo';
import { Text, View } from '../../components/Themed';
import { useCallback, useContext, useState } from 'react';
import { colors } from '../../constants/Colors';
import { AuthContext } from '../../contexts/Auth';


import useGetAllChangeBalancesQuery from '../../hooks-apollo/ChangeBalance/useGetAllChangeBalancesQuery';
import { QueryResult } from '../../components/QueryResult';
import wait, { waitTimes } from '../../utils/wait';


export default function PocketScreen({ navigation, route }: { navigation: any, route: any }) {

  const authContext = useContext(AuthContext);

  const contestData = { contest: contestsData.getAllContests[0] }

  const pocketID = route.params.pocketID;
  // const pocketID = pocket.pocketID

  const { data: businessesData, loading: businessesLoading, error: businessesError, refetch: refetchBusinesses } = useGetAllBusinessesQuery(pocketID)
  const { data: pocketData, loading: pocketLoading, error: pocketError, refetch: refetchPocket } = usePocketQuery(pocketID)
  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError, refetch: refetchChangeBalances } = useGetAllChangeBalancesQuery(authContext.userFirebase.uid, pocketID);

  // const pocket = pocketData.pocket;

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
      refetchPocket,
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

  const ItemSeparatorComponent = () => (
    <View style={{ height: MARGIN }} />
  )

  // Return query errors
  if (businessesError) return (<Text>{businessesError.message}</Text>)
  if (pocketError) return (<Text>{pocketError.message}</Text>)
  if (changeBalanceError) return (<Text>{changeBalanceError.message}</Text>)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={useHeaderHeight()}
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
                  {(pocketID === "2p")
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
          contentContainerStyle={styles.container}
          data={searchResults}
          renderItem={renderBusinessCard}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={businessesLoading ? <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} /> : <></>}
        />


      </ScreenContainer>

      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={'Search ' + pocketData?.pocket.pocketName}
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