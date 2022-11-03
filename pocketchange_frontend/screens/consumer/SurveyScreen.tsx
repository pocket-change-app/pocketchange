import { useState } from "react";
import { ChoiceSurvey, FeelingsSurvey, ThumbsSurvey } from "../../components/Surveys";
import { View } from "../../components/Themed";
import { surveyType } from "../../dummy";
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
      case surveyType.thumbs:
        return (
          <ThumbsSurvey
            survey={survey}
            onSubmit={onSubmit}
          />
        )
      case surveyType.feelings:
        return (
          <FeelingsSurvey
            survey={survey}
            onSubmit={onSubmit}
          />
        )
      default:
        return (null)
    }
  }

  return (
    <View style={styles.popupContainer}>
      <Survey
        survey={survey}
        onSubmit={() => navigation.goBack()}
      />
    </View>
  )
}