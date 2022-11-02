import { FontAwesome } from "@expo/vector-icons"
import { useState } from "react"
import { FlatList } from "react-native"
import { colors } from "../constants/Colors"
import { MARGIN, styles } from "../Styles"
import { ButtonWithText } from "./Cards"
import { HorizontalLine } from "./Lines"
import { Text, View } from "./Themed"

export const ThumbsSurvey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

  const { prompt } = survey

  const [liked, setLiked] = useState(undefined)

  const Button = (text: string, color: string, onPress: () => any) => (
    <ButtonWithText
      text={text}
      onPress={onPress}
      color={color}
    />
  )

  return (
    <View style={[styles.card]}>
      <View style={styles.container}>
        <Text style={styles.prompt}>
          {prompt}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <ButtonWithText
            text={<FontAwesome name='thumbs-up' size={styles.buttonBorderedText.fontSize * 1.5} />}
            onPress={() => setLiked(true)}
            color={liked === true ? colors.gold : undefined}
            negativeStyle={!(liked === true)}
            viewStyle={{ flex: 1 }}
          />

          <ButtonWithText
            text={<FontAwesome name='thumbs-down' size={styles.buttonBorderedText.fontSize * 1.5} />}
            onPress={() => setLiked(false)}
            color={liked === false ? colors.gold : undefined}
            negativeStyle={!(liked === false)}
            viewStyle={{ flex: 1 }}
          />
        </View>

      </View>

      <HorizontalLine />

      <View style={[styles.container, { flexDirection: 'row', justifyContent: 'center' }]}>
        <ButtonWithText
          text='Submit'
          onPress={liked !== undefined ? onSubmit : null}
          color={liked !== undefined ? colors.subtle : colors.light}
        />
      </View>

    </View>
  )
}



export const ChoiceSurvey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

  const { prompt, choices } = survey

  const [selected, setSelected] = useState(-1)

  const renderChoice = ({ item, index }: { item: string, index: number }) => {
    return (
      <ButtonWithText
        text={item}
        onPress={() => setSelected(index)}
        textTransform='capitalize'
        color={index === selected ? colors.gold : undefined}
        negativeStyle={index === selected ? false : true}
      />
    )
  }

  return (
    <View style={[styles.card]}>
      <View style={styles.container}>

        <Text style={styles.prompt}>
          {prompt}
        </Text>

        <FlatList
          scrollEnabled={false}
          data={choices}
          renderItem={renderChoice}
          ItemSeparatorComponent={() => <View style={{ height: MARGIN }} />}
        />

      </View>

      <HorizontalLine />

      <View style={[styles.container, { flexDirection: 'row', justifyContent: 'center' }]}>
        <ButtonWithText
          text='Submit'
          onPress={selected === -1 ? null : onSubmit}
          color={selected === -1 ? colors.light : colors.subtle}
        // negativeStyle
        />
      </View>

    </View>
  )
}