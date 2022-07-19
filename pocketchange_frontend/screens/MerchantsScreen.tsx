import { ScrollView } from 'react-native';

import { styles } from '../Styles';
import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';

const R = require('ramda');

export default function MerchantsScreen({ navigation }: { navigation: any }) {

  const businesses = [
    {
      "busId": "001",
      "name": "Avling",
      "address": "1042 QUEEN ST E",
      "pocket": "Leslieville",
      "imageURL": require("../assets/images/avling.jpg"),
    },
    {
      "busId": "002",
      "name": "La Paella",
      "address": "1146 QUEEN ST E",
      "pocket": "Leslieville",
      "imageURL": require("../assets/images/la-paella.jpg"),
    },
    {
      "busId": "003",
      "name": "Wvrst",
      "address": "Somewhere",
      "pocket": "Pocket",
      "imageURL": require("../assets/images/wvrst.jpg"),
    },
    {
      "busId": "004",
      "name": "Avling",
      "address": "1042 QUEEN ST E",
      "pocket": "Leslieville",
      "imageURL": require("../assets/images/avling.jpg"),
    },
    {
      "busId": "005",
      "name": "La Paella",
      "address": "1146 QUEEN ST E",
      "pocket": "Leslieville",
      "imageURL": require("../assets/images/la-paella.jpg"),
    },
    {
      "busId": "006",
      "name": "Wvrst",
      "address": "Somewhere",
      "pocket": "Pocket",
      "imageURL": require("../assets/images/wvrst.jpg"),
    },
    {
      "busId": "007",
      "name": "Wvrst",
      "address": "Somewhere",
      "pocket": "Pocket",
      "imageURL": require("../assets/images/wvrst.jpg"),
    }
  ]

  return (
    <ScrollView
      style={styles.container}>

      {R.map(
        ({ busId, name, address, pocket, imageURL }) => (
          <BusinessCardSm
            key={busId}
            navigation={navigation}
            name={name}
            address={address}
            pocket={pocket}
            imageURL={imageURL}
          />
        ), businesses
      )}

    </ScrollView>
  );
}