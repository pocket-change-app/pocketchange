import { StatusBar } from 'expo-status-bar';
import { Platform, Image } from 'react-native';

import { styles } from '../Styles';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { colors } from '../constants/Colors';

export default function BusinessModalScreen({ route, navigation }: { route: any, navigation: any }) {

  const { name, address, pocket, imageURL } = route.params;


  return (
    <View style={styles.container}>
      
      <View style={ styles.card }>
        <View style={ styles.imageContainer }>
          <Image
            style = { styles.businessHeaderImage } 
            source = { imageURL }
          />
        </View>
        <View style={ styles.businessInfo }>
          <Text style={ styles.name }>{ name }</Text>
          <Text style={ styles.address }>{ address }</Text>
          <Text style={ styles.pocket }>{ pocket }</Text>
        </View>
      </View>
      
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}


