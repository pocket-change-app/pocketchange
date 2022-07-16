import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

import { styles } from '../Styles';
import { PocketCardSm } from "../components/Cards";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function PocketScreen({ navigation }: RootTabScreenProps<'Pockets'>) {
  return (
    <ScrollView style={styles.scrollView}>
      <PocketCardSm
        name="Riverside"
      />
      <PocketCardSm
        name="Leslieville"
      />
      <PocketCardSm
        name="UPtown Yonge"
      />
    </ScrollView>
  );
}

