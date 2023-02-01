import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable } from "react-native";
import { styles } from "../Styles";
import getImageURL from "../utils/getImageUrl";
import { View } from "./Themed";

export default function ({ navigation, pocket }: { navigation: any, pocket: any }) {

  // TODO: take ID and use query

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("Pocket", pocket.pocketID, "pocketCard.png", setImageURL);
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate('Pocket', {
        pocketID: pocket.pocketID,
      })}
    >
      <View style={styles.pocketListCardContainer}>
        <View style={[styles.card, styles.pocketListCard]}>

          <View style={styles.pocketListImageContainer}>
            {imageURL ? (
              <Image
                style={[styles.image, styles.pocketListImage]}
                source={{ uri: imageURL }}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>

          {/* // todo: Plop the new change balance component here (hi mica)
          <ChangeBalanceComponent/> */}

        </View>
      </View>
    </Pressable>

  )
}