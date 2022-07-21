import { SafeAreaView, FlatList, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

import { styles } from '../Styles';
import { PocketListCard } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const R = require('ramda');





export default function PocketScreen({ navigation }: RootTabScreenProps<'Pockets'>) {

  const pockets = [
    {
      pocketID: '01',
      name: 'Leslieville',
      imageURL: require('../assets/images/leslieville.jpg'),
    },
    {
      pocketID: '02',
      name: 'Riverside',
      imageURL: require('../assets/images/riverside.jpg'),
    },
    {
      pocketID: '03',
      name: 'Uptown Yonge',
      imageURL: require('../assets/images/uptown_yonge.jpg'),
    },
    {
      pocketID: '04',
      name: 'Chinatown',
      imageURL: require('../assets/images/chinatown.jpg'),
    },
    {
      pocketID: '05',
      name: 'Little Italy',
      imageURL: require('../assets/images/little_italy.jpg'),
    },
  ];

  return (
    <FlatList
      style={styles.scrollView}
      horizontal={true}
      pagingEnabled={true}
      contentInsetAdjustmentBehavior="never"
      decelerationRate='fast'
      snapToAlignment='center'

      data={pockets}
      renderItem={({ item, index, separators }) => (
        <PocketListCard
          key={item.pocketID}
          navigation={navigation}
          name={item.name}
          imageURL={item.imageURL}
        />
      )}
    />

    // <ScrollView
    //   style={styles.scrollView}
    //   horizontal={true}
    //   pagingEnabled={true}
    //   //contentInsetAdjustmentBehavior="never"
    //   decelerationRate='fast'
    //   snapToAlignment='center'
    // >
    //   {R.map(
    //     ({ pocketID, name, imageURL }) => (
    //       <PocketCardList
    //         key={pocketID}
    //         navigation={navigation}
    //         name={name}
    //         imageURL={imageURL}
    //       />
    //     ), pockets
    //   )}
    // </ScrollView>

  );
}

