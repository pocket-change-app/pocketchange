import { ScrollView, FlatList } from 'react-native';

import { styles } from '../Styles';
import { businesses } from '../dummy';
import { BusinessCardSm } from '../components/Cards';
import { Text, View } from '../components/Themed';

const R = require('ramda');

export default function MerchantsScreen({ navigation }: { navigation: any }) {



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