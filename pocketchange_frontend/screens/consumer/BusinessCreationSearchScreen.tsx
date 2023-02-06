import { useEffect, useState } from "react";
import { ButtonWithText } from "../../components/Cards";
import SearchBar from "../../components/SearchBar";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { MARGIN, styles } from "../../Styles";
import Constants from "expo-constants";
import { FlatList, KeyboardAvoidingView, Platform, Pressable, SafeAreaView } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements'

// types for google places autocomplete responses
type PlaceAutocompletePrediction = {
  "description": string,
  "matched_substrings": { [key: string]: number }[], //[{ "length": 5, "offset": 0 }],
  "place_id": string,
  "reference": string,
  "structured_formatting":
  {
    "main_text": string,
    "main_text_matched_substrings": { [key: string]: number }[], //[{ "length": 5, "offset": 0 }],
    "secondary_text": string,
  },
  "terms": { [key: string]: number }[],
  "types": string[], //["locality", "political", "geocode"],
};

type PlacesAutocompleteStatus = ('OK' | 'ZERO_RESULTS' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR');

type PlacesAutocompleteResponse = {
  predictions: PlaceAutocompletePrediction[],
  status: PlacesAutocompleteStatus,
  error_message: string,
  info_messages: string[],
};


export default function ({ route, navigation }: { route: any, navigation: any }) {

  const headerHeight = useHeaderHeight();

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [autocompleteResponse, setAutocompleteResponse] = useState<PlacesAutocompleteResponse>()

  const GOOGLE_MAPS_API_KEY = Constants.manifest?.extra?.googleMapsApiKey;
  const GOOGLE_PLACES_AUTOCOMPLETE_API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&types=establishment&key=${GOOGLE_MAPS_API_KEY}`;

  const goToNextScreen = (place_id?: string) => {
    navigation.navigate('BusinessCreationEdit', { place_id: place_id })
  };

  async function placesAutoComplete() {
    if (!GOOGLE_MAPS_API_KEY) {
      console.log('no goog maps api key found')
      return null
    }
    fetch(GOOGLE_PLACES_AUTOCOMPLETE_API_URL, {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).then((response) => {
      // console.log("the data:\n", JSON.stringify(response, null, '  '))
      setAutocompleteResponse(response)
    }).catch((err) => {
      console.log(err)
    });
  }

  useEffect(() => {
    placesAutoComplete()
  }, [searchQuery])

  const renderPlace = ({ item, index }: { item: PlaceAutocompletePrediction, index: number }) => {
    return (
      <Pressable
        onPress={() => {
          console.log(item.place_id);

          goToNextScreen(item.place_id)
        }}
        style={[styles.card, styles.container, { marginBottom: 0 }]}
      >
        <Text style={[styles.businessNameSm, { textAlign: 'center' }]}>
          {item.structured_formatting.main_text}
        </Text>
        <Text style={[styles.address, { textAlign: 'center' }]}>
          {item.structured_formatting.secondary_text}
        </Text>
      </Pressable>

    )
  }

  const ItemSeparatorComponent = () => {
    return (
      <View style={{ height: MARGIN }} />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? 'padding' : "height"}
        keyboardVerticalOffset={headerHeight}
      >

        <ScreenContainer>

          <FlatList
            contentContainerStyle={styles.container}
            data={autocompleteResponse?.predictions}
            renderItem={renderPlace}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />

        </ScreenContainer>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search for your business'
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}