import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

import { PocketCardSm } from "../components/Cards";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { colors } from '../constants/Colors';
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

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
  },
  card: {
    //flex: 1,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderColor: colors.subtle,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'metropolis medium',
    color: colors.subtle,
    marginBottom: 15,
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: '80%',
  },
});
