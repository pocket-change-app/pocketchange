import { SafeAreaView, FlatList, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

import { styles } from '../Styles';
import { PocketCardList } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const R = require('ramda');



export default function PocketScreen({ navigation }: RootTabScreenProps<'Pockets'>) {

  const pockets = [
    {
      pocketID: '01',
      name: 'Riverside',
      imageURL: '../assets/images/wvrst.jpg',
    },
    {
      pocketID: '02',
      name: 'Riverside',
      imageURL: '../assets/images/wvrst.jpg',
    },
    {
      pocketID: '03',
      name: 'Riverside',
      imageURL: '../assets/images/wvrst.jpg',
    },
    {
      pocketID: '04',
      name: 'Riverside',
      imageURL: '../assets/images/wvrst.jpg',
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
        <PocketCardList
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

