import { ScrollView, FlatList, KeyboardAvoidingView, Pressable, Image } from 'react-native';
import { SearchBar } from '@rneui/base';
import { useContext, useState } from 'react';

import { styles, MARGIN } from '../Styles';
//import { transactions } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { CompetitionCard, ContestCard, DivHeader, renderParticipant, TranactionCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';
import { useGetAllTransactionsQuery } from '../hooks-apollo';
import { colors } from '../constants/Colors';


import { isNilOrEmpty } from 'ramda-adjunct';
import { AuthContext } from '../contexts/Auth';
import { HorizontalLine } from '../components/Lines';
import { FontAwesome } from '@expo/vector-icons';
import { snapItUp } from '../dummy';
const R = require('ramda');

export default function CompetitionsTabScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext);

  // TODO: search wont work unitl we find a way to use the users names 
  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setSearchResults(() => {
      const formattedQuery = text.toLowerCase().trim()
      const results = allTransactions.filter(t => t.userID.toLowerCase().includes(formattedQuery))
      return results
    })
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}>

      <ScreenContainer>

        {/* COMPETITION CARD */}
        <View style={styles.container}>

          <CompetitionCard competition={snapItUp} />

          <DivHeader text={'Participants'} />

          <FlatList
            data={snapItUp.participants}
            renderItem={renderParticipant}
          />
        </View>

      </ScreenContainer>

      {/* <SearchBar
        showCancel={false}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}

        inputStyle={styles.searchBarInput}
        placeholder="Search Transactions"
        placeholderTextColor={colors.subtle}

        onChangeText={updateSearch}
        onClear={() => null}
        value={searchQuery}
      /> */}
    </KeyboardAvoidingView>

  )

}