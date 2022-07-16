import { Pressable, ScrollView } from 'react-native';

import { styles } from '../Styles';
import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';

const R = require('ramda');

export default function MerchantsScreen({ navigation }) {
  
  const businesses = [
    {
      "name": "Avling",
      "address": "1042 QUEEN ST E",
      "pocket": "Leslieville",
      "imageURL": require("../assets/images/avling.jpg"),
    },
    {
      "name": "La Paella",
      "address": "1146 QUEEN ST E",
      "pocket": "Leslieville",
      "imageURL": require("../assets/images/la-paella.jpg"),
    },
    {
      "name": "Wvrst",
      "address": "Somewhere",
      "pocket": "Pocket",
      "imageURL": require("../assets/images/wvrst.jpg"),
    }
  ]

  return (
    <ScrollView style={styles.container}>

      {R.map(
        ({ name, address, pocket, imageURL }) => (
            <BusinessCardSm 
              navigation = { navigation }
              name = { name }
              address = { address }
              pocket = { pocket }
              imageURL = { imageURL }
            />
      ), businesses
      )}
      
    </ScrollView>
  );
}