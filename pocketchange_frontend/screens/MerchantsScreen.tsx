import { ScrollView, FlatList } from 'react-native';

import { styles } from '../Styles';
import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';

const R = require('ramda');

export default function MerchantsScreen({ navigation }: { navigation: any }) {

  const businesses = [
    {
      busID: "001",
      name: "Avling",
      address: "1042 QUEEN ST E",
      pocket: "Leslieville",
      imageURL: require("../assets/images/avling.jpg"),
    },
    {
      busID: "002",
      name: "La Paella",
      address: "1146 QUEEN ST E",
      pocket: "Leslieville",
      imageURL: require("../assets/images/la-paella.jpg"),
    },
    {
      busID: "003",
      name: "Wvrst",
      address: "Somewhere",
      pocket: 'Pckt',
      imageURL: require("../assets/images/wvrst.jpg"),
    },
    {
      busID: "004",
      name: "Avling",
      address: "1042 QUEEN ST E",
      pocket: "Leslieville",
      imageURL: require("../assets/images/avling.jpg"),
    },
    {
      busID: "005",
      name: "La Paella",
      address: "1146 QUEEN ST E",
      pocket: "Leslieville",
      imageURL: require("../assets/images/la-paella.jpg"),
    },
    {
      busID: "006",
      name: "Wvrst",
      address: "Somewhere",
      pocket: 'Pckt',
      imageURL: require("../assets/images/wvrst.jpg"),
    },
    {
      busID: "007",
      name: "Wvrst",
      address: "Somewhere",
      pocket: 'Pckt',
      imageURL: require("../assets/images/wvrst.jpg"),
    }
  ]

  // const renderBusinessCard = (busId: string, name: string, address: string, pocket: string, imageURL: string) => (
  //   <BusinessCardSm
  //     key={busId}
  //     navigation={navigation}
  //     name={name}
  //     address={address}
  //     pocket={pocket}
  //     imageURL={imageURL}
  //   />
  // )

  return (
    <FlatList
      style={styles.container}

      data={businesses}
      renderItem={({ item, index, separators }) => (
        <BusinessCardSm
          key={item.busID}
          navigation={navigation}
          name={item.name}
          address={item.address}
          pocket={item.pocket}
          imageURL={item.imageURL}
        />
      )}
    />

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