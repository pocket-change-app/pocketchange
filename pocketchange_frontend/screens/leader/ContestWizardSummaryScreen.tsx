import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { DivHeader } from "../../components/Cards";
import { HorizontalLine } from "../../components/Lines";
import { ScreenContainer, Text, View } from "../../components/Themed";
import { AuthContext } from "../../contexts/Auth";
import { styles } from "../../Styles";


export default function ContestWizardSummaryScreen({ route, navigation }: { route: any, navigation: any }) {

  const authContext = useContext(AuthContext)

  const { contest } = route.params

  return (
    <ScreenContainer>

      <View style={styles.container}>
        <DivHeader text='Create Contest:' />

        <View style={[styles.card]}>
          <View style={styles.container}>
            <Text style={styles.contestTitle}>
              <FontAwesome name='trophy' style={styles.contestTitle} />
              {' ' + contest?.contestName}
            </Text>
          </View>

          <HorizontalLine />

          <View style={styles.container}>
            <Text style={styles.prose}>
              {contest?.description}
            </Text>
          </View>

          <HorizontalLine />

          <View style={styles.container}>

            <Text style={[styles.prose, { lineHeight: 18, fontSize: 12, textAlign: 'center', }]}>
              Contest active {contest?.startDate.toLocaleDateString()} through {contest?.endDate.toLocaleDateString()}.
            </Text>

          </View>
        </View>
      </View>
    </ScreenContainer>
  )
}