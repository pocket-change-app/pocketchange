import { FontAwesome } from "@expo/vector-icons"
import { ReactElement, useState } from "react"
import { FlatList, GestureResponderEvent, StyleProp, TextInput, TextStyle, ViewStyle } from "react-native"
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


/**
 * Survey with a thumbs up/down response
 */
export const ThumbSurvey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

  const { prompt } = survey

  const [liked, setLiked] = useState<(undefined | boolean)>(undefined)

  return (
    <View style={[styles.card, styles.surveyCard]}>
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

export const TextSurvey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

  const { prompt } = survey

  const [response, setResponse] = useState('')

  return (
    <View style={[styles.card, styles.surveyCard]}>
      <View style={styles.container}>
        <Text style={styles.prompt}>
          {prompt}
        </Text>

        <View style={[styles.card, styles.inputFieldContainer, { marginBottom: MARGIN }]}>
          {/* <Text style={[styles.prose]}>
                  Contest Name
                </Text> */}

          <View style={[styles.textInputContainer]}>
            <TextInput
              autoFocus
              multiline
              // returnKeyType="next"
              selectionColor={colors.gold}
              // autoCapitalize='words'
              style={styles.inputText}
              // keyboardType='numeric'
              value={response}
              onChangeText={setResponse}
              // placeholder={'Name Goes Here (/^-^)/'}
              placeholderTextColor={colors.subtle}
            />
          </View>
        </View>

      </View>

      <HorizontalLine />

      <View style={[styles.container, { flexDirection: 'row', justifyContent: 'center' }]}>
        <SubmitButton
          surveyFilled={response !== ''}
          onPress={onSubmit}
        />
      </View>

    </View>
  )
}


/**
 * Survey with smile/neutral/frown response
 */
export const FeelingSurvey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

  enum Feeling {
    bad = -1,
    meh = 0,
    good = 1,
  }

  const { prompt } = survey

  const [feeling, setFeeling] = useState<(undefined | Feeling)>(undefined)

  return (
    <View style={[styles.card, styles.surveyCard]}>
      <View style={styles.container}>
        <Text style={styles.prompt}>
          {prompt}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <SurveyButton
            text={<FontAwesome name='smile-o' size={styles.buttonBorderedText.fontSize * 1.5} />}
            onPress={() => setFeeling(Feeling.good)}
            viewStyle={{ flex: 1 }}
            isSelected={feeling === Feeling.good}
          />

          <View style={{ width: MARGIN }} />

          <SurveyButton
            text={<FontAwesome name='meh-o' size={styles.buttonBorderedText.fontSize * 1.5} />}
            onPress={() => setFeeling(Feeling.meh)}
            viewStyle={{ flex: 1 }}
            isSelected={feeling === Feeling.meh}
          />

          <View style={{ width: MARGIN }} />

          <SurveyButton
            text={<FontAwesome name='frown-o' size={styles.buttonBorderedText.fontSize * 1.5} />}
            onPress={() => setFeeling(Feeling.bad)}
            viewStyle={{ flex: 1 }}
            isSelected={feeling === Feeling.bad}
          />
        </View>

      </View>

      <HorizontalLine />

      <View style={[styles.container, { flexDirection: 'row', justifyContent: 'center' }]}>
        <SubmitButton
          surveyFilled={feeling !== undefined}
          onPress={onSubmit}
        />
      </View>

    </View>
  )
}


/**
 * Survey with response in multiple-choice format
 */
export const SelectSurvey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

  const { prompt, selections } = survey

  const [selected, setSelected] = useState(-1)

  const renderChoice = ({ item, index }: { item: string, index: number }) => {
    return (
      <SurveyButton
        isSelected={index === selected}
        text={item}
        onPress={() => setSelected(index)}
        textTransform='capitalize'
        viewStyle={{ margin: MARGIN / 2 }}
      />
    )
  }

  return (
    <View style={[styles.card, styles.surveyCard]}>
      <View style={styles.container}>

        <Text style={styles.prompt}>
          {prompt}
        </Text>

        <FlatList
          scrollEnabled={false}
          data={selections}
          // contentContainerStyle={{ flexWrap: 'wrap', justifyContent: 'center', }}
          contentContainerStyle={{ alignItems: 'center', }}
          renderItem={renderChoice}
          numColumns={100}
          columnWrapperStyle={{ justifyContent: 'center', flexWrap: 'wrap' }}
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


/**
 * Survey with response in multiple-choice format
 */
export const MultiSelectSurvey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

  const { prompt, selections } = survey

  const [selected, setSelected] = useState<(0 | 1)[]>(new Array(selections.length).fill(0))

  const surveyFilled = () => {
    let result = false
    for (const i in selected) {
      if (selected[i] === 1) return true
    }
    return false
  }

  console.log(selected);

  const pointwise = (f: (a: typeof arr0[0], b: typeof arr1[0]) => any, arr0: any[], arr1: any[]) => {
    for (const i in arr0) {
      arr0[i] = f(arr0[i], arr1[i])
    }
    return arr0
  }

  const select = (index: number): void => {
    const thisSelection: (0 | 1)[] = new Array(selections.length).fill(0)
    thisSelection[index] = 1;
    const newSelected = pointwise((a, b) => (a + b) % 2, thisSelection, selected)
    console.log(newSelected);
    setSelected(newSelected)
  }


  const renderChoice = ({ item, index }: { item: string, index: number }) => {
    return (
      <SurveyButton
        isSelected={selected[index] === 1}
        text={item}
        onPress={() => select(index)}
        textTransform='capitalize'
        viewStyle={{ margin: MARGIN / 2 }}
      />
    )
  }

  return (
    <View style={[styles.card, styles.surveyCard]}>
      <View style={styles.container}>

        <Text style={styles.prompt}>
          {prompt}
        </Text>

        <FlatList
          scrollEnabled={false}
          data={selections}
          // contentContainerStyle={{ flexWrap: 'wrap', justifyContent: 'center', }}
          contentContainerStyle={{ alignItems: 'center', }}
          renderItem={renderChoice}
          numColumns={100}
          columnWrapperStyle={{ justifyContent: 'center', flexWrap: 'wrap' }}
        />

      </View>

      <HorizontalLine />

      <View style={[styles.container, { flexDirection: 'row', justifyContent: 'center' }]}>
        <SubmitButton
          surveyFilled={surveyFilled()}
          onPress={onSubmit}
        />
      </View>

    </View>
  )
}