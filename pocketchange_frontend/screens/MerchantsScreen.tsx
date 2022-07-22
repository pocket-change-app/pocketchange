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
      bio: "We offer the best products and service around. I have no idea what to write for this because I can't remember what Avling does :)",
      people: [
        {
          name: 'Max',
          position: 'Owner',
          imageURL: require('../assets/images/max.png')
        }
      ]
    },
    {
      busID: "002",
      name: "La Paella",
      address: "1146 QUEEN ST E",
      pocket: "Leslieville",
      imageURL: require("../assets/images/la-paella.jpg"),
      bio: "Best paella in the biz'.",
      people: [
        {
          name: 'Mike',
          position: 'Owner',
          imageURL: require('../assets/images/mike.png')
        }
      ]
    },
    {
      busID: "003",
      name: "Wvrst",
      address: "Somewhere",
      pocket: 'Pckt',
      imageURL: require("../assets/images/wvrst.jpg"),
      bio: "We have the meats. Lol can I get in trouble for saying that?",
      people: [
        {
          name: 'Miguel',
          position: 'Manager',
          imageURL: require('../assets/images/miguel.png')
        }
      ]
    },
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
          bio={item.bio}
          people={item.people}
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