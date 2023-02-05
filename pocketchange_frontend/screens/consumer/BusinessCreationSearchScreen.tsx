import { useEffect, useState } from "react";
import { ButtonWithText } from "../../components/Cards";
import SearchBar from "../../components/SearchBar";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { styles } from "../../Styles";
import Constants from "expo-constants";
import { FlatList } from "react-native";

// types for google places autocomplete responses
type PlaceAutocompletePrediction = {
  description: string,
};

type PlacesAutocompleteStatus = ('OK' | 'ZERO_RESULTS' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR');

type PlacesAutocompleteResponse = {
  predictions: PlaceAutocompletePrediction[],
  status: PlacesAutocompleteStatus,
  error_message: string,
  info_messages: string[],
};


export default function ({ route, navigation }: { route: any, navigation: any }) {

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [placesResponse, setPlacesResponse] = useState<PlacesAutocompleteResponse>()

  const GOOGLE_MAPS_API_KEY = Constants.manifest?.extra?.googleMapsApiKey;
  const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&types=establishment&key=${GOOGLE_MAPS_API_KEY}`;

  const goToNextScreen = () => {
    navigation.navigate('BusinessCreationEdit', {})
  };

  async function placesAutoComplete() {
    if (!GOOGLE_MAPS_API_KEY) {
      console.log('no goog maps api key found')
      return null
    }
    console.log(GOOGLE_MAPS_API_KEY)
    fetch(GOOGLE_MAPS_API_URL, {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log("the data:\n", JSON.stringify(response, null, '  '))
      setPlacesResponse(response)
    }).catch((err) => {
      console.log(err)
    });
  }

  useEffect(() => {
    placesAutoComplete()
  }, [searchQuery])

  const renderPlace = ({ item, index }: { item: PlaceAutocompletePrediction, index: number }) => {
    return (
      <Text>
        {item.description}
      </Text>
    )
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search for your business...'
        />

        <FlatList
          data={placesResponse?.predictions}
          renderItem={renderPlace}
        />


        <ButtonWithText
          text='get places autocomplete'
          onPress={placesAutoComplete}
        />

      </View>

    </ScreenContainer>
  )
}