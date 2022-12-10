import { LocationObject } from "expo-location";
import { useContext } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { BusinessCardSm, BusinessInfo } from "../../components/Cards";
import { View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { AuthContext } from "../../contexts/Auth";
import { useGetAllBusinessesQuery } from "../../hooks-apollo";
import { styles } from "../../Styles";




export default function MapScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext)

  const { data: businessesData, loading: businessesLoading, error: businessesError, refetch: refetchBusinesses } = useGetAllBusinessesQuery()

  // const authContext = useContext(AuthContext)
  console.log(JSON.stringify(authContext.location, null, '  '));

  return (
    // <View style={{ flex: 1 }}>
    <MapView
      // provider='google'
      style={[styles.image, styles.pocketListImage, { flex: 1, borderRadius: 0 }]}
      showsUserLocation
      showsMyLocationButton
      initialRegion={{
        latitude: 43.66393648913529,
        longitude: -79.3154142212031,
        latitudeDelta: 0.01,
        longitudeDelta: 0.05,
      }}
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
          <Callout >
            <BusinessInfo
              navigation={navigation}
              businessID={business.businessID}
            />
          </Callout>
        </Marker>
      ))}

    </MapView>
    // </View>
  )
}