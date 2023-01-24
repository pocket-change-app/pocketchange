import { LocationObject } from "expo-location";
import { useContext, useEffect, useRef } from "react";
import MapView, { Callout, Details, Marker, Polygon, Polyline, Region, Geojson, Camera } from "react-native-maps";
import { BusinessCardSm, BusinessInfo } from "../../components/Cards";
import { Text, View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { useGetAllBusinessesQuery } from "../../hooks-apollo";
import { styles } from "../../Styles";
import polylabel from "polylabel";
import { BIAsOutlines } from "../../BIAs";
import { NavigationState } from "@react-navigation/native";
import { RootStackParamList, RootStackScreenProps, RootTabScreenProps } from "../../types";



export default function MapScreen({ route, navigation }: { route: any, navigation: any }) {

  const { center } = route.params;

  console.log(JSON.stringify(center));


  const authContext = useContext(AuthContext)

  const { data: businessesData, loading: businessesLoading, error: businessesError, refetch: refetchBusinesses } = useGetAllBusinessesQuery()

  const onRegionChange = (region: Region, details: Details) => {
    console.log(`latitude: ${region.latitude}`);
    console.log(`longitude: ${region.longitude}`);
    console.log();
  }

  const testPolygon = [
    {
      latitude: 43.672308614364816,
      longitude: -79.31499755441902
    },
    {
      latitude: 43.66487422523087,
      longitude: -79.33416422648763
    },
    {
      latitude: 43.64462602965331,
      longitude: -79.33303587058124
    },
    {
      latitude: 43.64961756176936,
      longitude: -79.31525808779296
    },
    {
      latitude: 43.65852428179872,
      longitude: -79.31099125836472
    },
    {
      latitude: 43.662446240880364,
      longitude: -79.29470252644401
    },
  ]

  const p1 = [testPolygon.map(coord => [coord.latitude, coord.longitude])]

  const labelCoords = polylabel(p1, 1.0)
  const testLabelLatLng = {
    latitude: labelCoords[0],
    longitude: labelCoords[1]
  }
  console.log(testLabelLatLng);


  return (
    // <View style={{ flex: 1 }}>
    <MapView
      // provider='google'
      style={{ flex: 1, borderRadius: 0 }}
      showsUserLocation
      showsMyLocationButton
      initialCamera={{
        center: { ...center },
        heading: 0,
        pitch: 20,
        altitude: 5000
      }}
      // onRegionChange={onRegionChange}
      // initialRegion={{
      //   latitude: 43.66393648913529,
      //   longitude: -79.3154142212031,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.05,
      // }}
      mapType='mutedStandard'
    >
      {/* BUSINESS MARKERS */}
      {businessesData?.getAllBusinesses?.map((business: any) => (
        <Marker
          key={business?.businessID}
          coordinate={{ latitude: business.latitude, longitude: business.longitude }}
          // title={business?.businessName}
          // description={business?.description}
          pinColor={colors.gold}
        >
          <Callout>
            <BusinessInfo
              navigation={navigation}
              businessID={business.businessID}
            />
          </Callout>
        </Marker>
      ))}

      {/* POLYGONS */}


      {/* <Geojson
        geojson={BIAsOutlines}
        strokeColor={colors.gold}
        fillColor={colors.gold + '22'}
      /> */}


      {/*
      <Polygon
        coordinates={testPolygon}
        // strokeWidth={2}
        strokeColor={colors.gold}
        fillColor={colors.gold + '22'}
      >

      </Polygon>
      <Marker
        key="asdf"
        coordinate={testLabelLatLng}
        pinColor={colors.tomato}
      >
        <Text style={[styles.pocket, { color: colors.gold }]}>
          ~Experience Land~
        </Text>
        <Callout>
          <Text>
            {"<Callout> for Experience Land"}
          </Text>
        </Callout>
      </Marker> */}

    </MapView>
  )
}