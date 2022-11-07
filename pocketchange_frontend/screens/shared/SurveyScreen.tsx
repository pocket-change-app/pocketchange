import { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { SelectSurvey, MultiSelectSurvey, FeelingSurvey, ThumbSurvey, TextSurvey } from "../../components/Surveys";
import { View } from "../../components/Themed";
import { surveyType } from "../../dummy";
import { styles } from "../../Styles";


export default function SurveyScreen({ route, navigation }: { route: any, navigation: any }) {

  const { survey } = route.params

  const [surveyFilled, setSurveyFilled] = useState(false)

  const Survey = ({ survey, onSubmit }: { survey: any, onSubmit: () => any }) => {

    switch (survey.type) {
      case surveyType.select:
        return (
          <SelectSurvey
            survey={survey}
            onSubmit={onSubmit}
          />
        )
      case surveyType.multiSelect:
        return (
          <MultiSelectSurvey
            survey={survey}
            onSubmit={onSubmit}
          />
        )
      case surveyType.thumb:
        return (
          <ThumbSurvey
            survey={survey}
            onSubmit={onSubmit}
          />
        )
      case surveyType.feeling:
        return (
          <FeelingSurvey
            survey={survey}
            onSubmit={onSubmit}
          />
        )
      case surveyType.text:
        return (
          <TextSurvey
            survey={survey}
            onSubmit={onSubmit}
          />
        )
      default:
        return (null)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <View style={styles.popupContainer}>
        <Survey
          survey={survey}
          // TODO: return survey results to the backend
          onSubmit={() => navigation.goBack()}
        />
      </View>
    </KeyboardAvoidingView>
  )
}