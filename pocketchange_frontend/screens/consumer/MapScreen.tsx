import { LocationObject } from "expo-location";
import { useContext } from "react";
import MapView from "react-native-maps";
import { View } from "../../components/Themed";
import { AuthContext } from "../../contexts/Auth";




export default function MapScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext)

  // const authContext = useContext(AuthContext)
  console.log(JSON.stringify(authContext.location, null, '  '));

  return (
    // <View style={{ flex: 1 }}>
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      showsMyLocationButton
      initialRegion={{
        latitude: 43.66393648913529,
        longitude: -79.3154142212031,
        latitudeDelta: 0.01,
        longitudeDelta: 0.05,
      }}
      mapType='mutedStandard'
    />
    // </View>
  )
}