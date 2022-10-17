import { Platform, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';

import { MARGIN, styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import { BusinessCard, ChangeBalanceCard } from '../components/Cards';

import { colors } from '../constants/Colors';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';

import useGetAllChangeBalancesQuery from '../hooks-apollo/ChangeBalance/useGetAllChangeBalancesQuery';
import { QueryResult } from '../components/QueryResult';


export default function BusinessScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext); 

  const { business, pocket } = route.params;

  const { data: changeBalanceData, loading: changeBalanceLoading, error: changeBalanceError, refetch: refetchChangeBalances } = useGetAllChangeBalancesQuery(authContext.userFirebase.uid, pocket.pocketID);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}>

        <BusinessCard
          navigation={navigation}
          business={business} 
          changeBalance={changeBalanceData.getAllChangeBalances} />

        <QueryResult loading={changeBalanceLoading} error={changeBalanceError} data={changeBalanceData}>
          <ChangeBalanceCard
            changeBalance={changeBalanceData.getAllChangeBalances} 
            pocket={pocket} />
        </QueryResult>
      
        {
          business.description ?
            <View style={[styles.card, styles.container]}>
              <Text style={[styles.prose]}>{business.description}</Text>
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