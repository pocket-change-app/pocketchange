import { FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Pressable, TextInput } from 'react-native';
import { SearchBar } from '@rneui/base';
import { useHeaderHeight } from '@react-navigation/elements'

import { styles } from '../../Styles';
//import { businesses } from '../dummy';
import { ScreenContainer } from '../../components/Themed';
import { BusinessCardSm, BusinessCardSuggested, DivHeader } from '../../components/Cards';
import { BusinessCard } from '../../components/Cards';

import { colors } from '../../constants/Colors';
import { useContext, useEffect, useState } from 'react';
import { useGetLovedBusinessesQuery } from '../../hooks-apollo';
import { isNilOrEmpty } from 'ramda-adjunct';
import { AuthContext } from '../../contexts/Auth';

const R = require('ramda');

export default function PayTabScreen({ navigation }: { navigation: any }) {

    const authContext = useContext(AuthContext); 

    const userID = '1c'
    const { businesses, loading, refetch } = useGetLovedBusinessesQuery(userID)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState('')

    // useEffect(() => {
    //     // setSearchResults(businesses); // This is be executed when `loading` state changes
    // }, [loading])

    // if (isNilOrEmpty(businesses)) {
    //     return null
    // }

    if (isNilOrEmpty(businesses)) {
        return (null)
    }

    // make search all businesses instead of loved
    const updateSearch = (text: string) => {
        setSearchQuery(text)
        setSearchResults(() => {
            const formattedQuery = text.toLowerCase().trim()
            const results = businesses.filter(b => b.businessName.toLowerCase().includes(formattedQuery))
            return results
        })
    };

    const renderBusinessCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
        <Pressable
            onPress={() => navigation.navigate('BusinessModal', {
                business: item
            })}
        >
            <BusinessCardSm
                key={item.businessID}
                navigation={navigation}
                business={item}
                pocket={"Leslieville"}
            />
        </Pressable>
    )

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={useHeaderHeight()}
            style={{ flex: 1 }}
        >

            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <ScreenContainer>

                {isNilOrEmpty(businesses) ? null : <>

                    <FlatList
                        contentContainerStyle={[styles.businessFlatList, { flexGrow: 1 }]}
                        data={searchQuery ? searchResults : businesses}
                        renderItem={renderBusinessCard}
                        ListHeaderComponent={() => {
                            if (searchQuery == '') {
                                return (
                                    <>
                                        <DivHeader text='Suggested' />
                                            <BusinessCardSuggested
                                                key={businesses[0].businessID}
                                                navigation={navigation}
                                                business={businesses[0]}
                                                pocket={"Leslieville"}
                                            />
                        
                                        <DivHeader text='Loved' />
                                    </>
                                )
                            } else {
                                return (null)
                            }
                        }}
                    />

                </>}
            </ScreenContainer>

            <SearchBar
                showCancel={false}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}

                inputStyle={styles.searchBarInput}
                placeholder="Search Businesses"
                placeholderTextColor={colors.subtle}

                onChangeText={updateSearch}
                onClear={() => null}
                value={searchQuery}
            />

        </KeyboardAvoidingView>

    )

}