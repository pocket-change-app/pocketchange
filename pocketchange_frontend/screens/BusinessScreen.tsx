import { Platform, Image, Pressable, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

import { MARGIN, styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BusinessCard, ChangeBalanceCard } from '../components/Cards';

import { colors } from '../constants/Colors';
import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../contexts/Auth';

import useGetAllChangeBalancesQuery from '../hooks-apollo/ChangeBalance/useGetAllChangeBalancesQuery';
import { QueryResult } from '../components/QueryResult';
import { useBusinessQuery } from '../hooks-apollo';
import wait, { waitTimes } from '../utils/wait';


export default function BusinessScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const businessID = route.params.businessID
  const pocketID = route.params.pocketID

  const changeBalancesQuery = useGetAllChangeBalancesQuery(authContext.userFirebase.uid, pocketID);
  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError, refetch: refetchChangeBalances } = changeBalancesQuery
  if (changeBalanceError) return (<Text>{changeBalanceError.message}</Text>)

  const businessQuery = useBusinessQuery(businessID)
  const { data: businessData, loading: businessLoading, error: businessError, refetch: refetchBusiness } = businessQuery
  if (businessError) return (<Text>{businessError.message}</Text>)

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      refetchBusiness,
      refetchChangeBalances,
    ]).then(() => setRefreshing(false));
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.container}>

        <BusinessCard
          navigation={navigation}
          businessID={businessID}
          pocketID={pocketID} />

        {/* <QueryResult loading={changeBalanceLoading} error={changeBalanceError} data={changeBalanceData}> */}
        <ChangeBalanceCard pocketID={pocketID} />
        {/* </QueryResult> */}
      
        {
          businessData?.business?.description ?
            <View style={[styles.card, styles.container]}>
              <Text style={[styles.prose]}>{businessData?.business?.description}</Text>
            </View> :
            <></>
        }
      

        <View style={{ height: MARGIN }} />

      </ScrollView>
    </ScreenContainer>
  );
}


function Signature({ name, position, imageURL }: { name: string, position: string, imageURL: string }) {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <Image
        style={styles.signatureImage}
        source={imageURL}
      />
      <View style={{ justifyContent: 'center' }}>
        <Text style={[styles.signatureText, { color: colors.medium }]}>{name}</Text>
        <Text style={[styles.signatureText, { color: colors.subtle }]}>{position}</Text>
      </View >
    </View >
  )
}