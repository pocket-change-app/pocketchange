import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { colors } from '../constants/Colors';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>HEADER TEXT</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 15,
    marginTop: 15,
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
