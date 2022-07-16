import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { colors } from '../constants/Colors';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.card}>
        <Text style={styles.title}>HEADER TEXT</Text>
        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>HEADER TEXT</Text>
        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>HEADER TEXT</Text>
        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </View>
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
