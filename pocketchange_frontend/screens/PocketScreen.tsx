import { SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

import { styles } from '../Styles';
import { pockets } from '../dummy';
import { PocketListCard } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const R = require('ramda');





export default function PocketScreen({ navigation }: RootTabScreenProps<'Pockets'>) {

  return (
    <FlatList
      // style={styles.scrollView}
      // horizontal
      // pagingEnabled={true}
      // contentInsetAdjustmentBehavior="never"
      // decelerationRate='fast'
      // snapToAlignment='center'

      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}

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

  );
}

