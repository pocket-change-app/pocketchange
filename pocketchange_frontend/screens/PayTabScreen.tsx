import { FlatList, Pressable } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { ScreenContainer } from '../components/Themed';
import { BusinessCardSm } from '../components/Cards';
import { BusinessCard } from '../components/Cards';

import { colors } from '../constants/Colors';
import { Text, View } from '../components/Themed';

const R = require('ramda');

export default function PayTabScreen({ navigation }: { navigation: any }) {

  let search = '';

  const renderBusinessCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <BusinessCardSm
      key={item.busID}
      navigation={navigation}
      business={item}
    />
  )

  const updateSearch = (search: string) => {
    search = search
  };

  return (
    <>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}

        inputStyle={styles.searchBarInput}
        placeholder="Search Businesses"
        placeholderTextColor={colors.subtle}

        onChangeText={updateSearch}
        value={search}
      />
      <ScreenContainer>
        <FlatList
          contentContainerStyle={styles.businessFlatList}
          data={businesses}
          renderItem={renderBusinessCard}
          ListHeaderComponent={
            <>
              <View style={styles.cardHeader}><Text style={styles.cardHeaderText}>Suggested</Text></View>
              <Pressable
                onPress={() => navigation.navigate('BusinessModal', {
                  business: businesses[0]
                })}
              >

                <BusinessCard
                  key={businesses[0].busID}
                  navigation={navigation}
                  business={businesses[0]}
                />
              </Pressable>
              <View style={styles.cardHeader}><Text style={styles.cardHeaderText}>Loved</Text></View>
            </>



          }
        />
      </ScreenContainer>
    </>

    //   <ScrollView
    //     style={styles.container}
    //   >
    //     {R.map(
    //       ({ busID, name, address, pocket, imageURL }) => (
    //         <BusinessCardSm
    //           key={busID}
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