import { FontAwesome } from "@expo/vector-icons"
import { ReactElement, useState } from "react"
import { FlatList, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native"
import { colors } from "../constants/Colors"
import { MARGIN, styles } from "../Styles"
import { ButtonWithText } from "./Cards"
import { HorizontalLine } from "./Lines"
import { Text, View } from "./Themed"

//// All survey buttons for data input will have same style and behaviour:
const SurveyButton = (
  {
    isSelected,
    text,
    onPress,
    textTransform,
    viewStyle,
    textStyle,
  }: {
    /**
     * Whether the curent option is selected or not.
     * This will determine color and negativeStyle.
     */
    isSelected: boolean,
    text: string | ReactElement,
    onPress: null | ((event: GestureResponderEvent) => void) | undefined,
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined,
    viewStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
  }
) => (
  <ButtonWithText
    text={text}
    onPress={onPress}
    textTransform={textTransform}
    viewStyle={viewStyle}
    textStyle={textStyle}
    color={isSelected ? colors.gold : undefined}
    negativeStyle={!isSelected}
  />
)

const SubmitButton = ({ surveyFilled, onPress }: { surveyFilled: boolean, onPress: () => any }) => (
  <ButtonWithText
    text='Submit'
    onPress={surveyFilled ? onPress : null}
    color={surveyFilled ? colors.subtle : colors.light}
  />
)
export const ThumbsSurvey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

  const { prompt } = survey

  const [liked, setLiked] = useState(undefined)

  type ButtonWithTextParameters = Parameters<typeof ButtonWithText>

  return (
    <View style={[styles.card]}>
      <View style={styles.container}>
        <Text style={styles.prompt}>
          {prompt}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <SurveyButton
            text={<FontAwesome name='thumbs-up' size={styles.buttonBorderedText.fontSize * 1.5} />}
            onPress={() => setLiked(true)}
            viewStyle={{ flex: 1 }}
            isSelected={liked === true}
          />

          <View style={{ width: MARGIN }} />

          <SurveyButton
            text={<FontAwesome name='thumbs-down' size={styles.buttonBorderedText.fontSize * 1.5} />}
            onPress={() => setLiked(false)}
            viewStyle={{ flex: 1 }}
            isSelected={liked === false}
          />
        </View>

      </View>

      <HorizontalLine />

      <View style={[styles.container, { flexDirection: 'row', justifyContent: 'center' }]}>
        <SubmitButton
          surveyFilled={liked !== undefined}
          onPress={onSubmit}
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
      <SurveyButton
        isSelected={index === selected}
        text={item}
        onPress={() => setSelected(index)}
        textTransform='capitalize'
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
        <SubmitButton
          surveyFilled={selected >= 0}
          onPress={onSubmit}
        />
      </View>

    </View>
  )
}