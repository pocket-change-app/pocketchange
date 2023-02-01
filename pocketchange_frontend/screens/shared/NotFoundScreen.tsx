import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtonWithText } from '../../components/Cards';

import { Text, View } from '../../components/Themed';
import { styles } from '../../Styles';
import { colors } from '../../constants/Colors';
import { RootStackScreenProps } from '../../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { flex: 1, justifyContent: 'center' }]}>
        <Text style={styles.prompt}>Oops! This screen doesn't exist.</Text>
        <ButtonWithText
          text="Back to PocketChange"
          textTransform='none'
          // negativeStyle
          // color={colors.gold}
          onPress={() => navigation.replace('Root')}
        />
      </View>

    </SafeAreaView>
  );
}