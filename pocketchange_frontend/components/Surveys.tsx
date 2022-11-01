import { useState } from "react"
import { FlatList } from "react-native"
import { colors } from "../constants/Colors"
import { MARGIN, styles } from "../Styles"
import { ButtonWithText } from "./Cards"
import { HorizontalLine } from "./Lines"
import { Text, View } from "./Themed"

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