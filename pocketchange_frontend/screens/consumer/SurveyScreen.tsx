import { NavigationState, Route, RouteProp, RouterConfigOptions } from "@react-navigation/native";
import { useState } from "react";
import { ButtonWithText } from "../../components/Cards";
import { ChoiceSurvey } from "../../components/Surveys";
import { View } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { surveyType, dummyChoiceSurvey } from "../../dummy";
import { styles } from "../../Styles";


export default function SurveyScreen({ route, navigation }: { route: any, navigation: any }) {

  const { survey } = route.params

  const [surveyFilled, setSurveyFilled] = useState(false)

  const Survey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

    switch (survey.type) {
      case surveyType.choice:
        return (
          <ChoiceSurvey
            survey={survey}
            onSubmit={onSubmit}
          />
        )
      default:
        return (null)
    }
  }

  return (
    <View style={[styles.screenContainer, styles.container, { justifyContent: 'center', backgroundColor: colors.overlay }]}>
      <Survey
        survey={survey}
        onSubmit={() => navigation.goBack()}
      />
    </View>
  )
}