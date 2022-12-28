import { useEffect } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { HorizontalLine } from "../../components/Lines";
import { ScreenContainer, Text, View } from "../../components/Themed";
import TransactionSummary from "../../components/TransactionSummary";
import { colors } from "../../constants/Colors";
import { usePocketQuery, useUserQuery } from "../../hooks-apollo";
import { MARGIN, styles } from "../../Styles";



export default function TransactionScreen({ route, navigation }: { route: any, navigation: any }) {

  const { transaction } = route.params;

  const { user, loading: userLoading, error: userError, refetch: refetchUser } = useUserQuery(transaction?.userID)
  if (userError) return (<Text>{userError.message}</Text>)

  const { data: pocket, loading: pocketLoading, error: pocketError, refetch: refetchPocket } = usePocketQuery(transaction?.pocketID)
  if (pocketError) return (<Text>{pocketError.message}</Text>)

  useEffect(() => {
    if (user.firstName) {
      navigation.setOptions({ title: user?.firstName + ' paid' })
    }

    // console.log('setOptions call');

  }, [user])

  const theDate = new Date(transaction.date)
  const date = theDate.toLocaleDateString()
  const time = theDate.toLocaleTimeString()

  const loading = userLoading || pocketLoading

  const ScreenContents = () => (
    <ScrollView>
      <View style={styles.container}>


        {/* <View style={[styles.textContainer, { marginBottom: MARGIN / 2 }]}>
          <Text style={styles.businessNameLg}>
            {user.firstName} paid
          </Text>
        </View> */}


        <TransactionSummary
          amount={transaction.value}
          tip={'1.23'}  // TODO: get tip from transaction once tips are recorded in backend
        />

        <View style={styles.textContainer}>
          <Text style={[styles.paymentSummaryText, { textAlign: 'right' }]}>
            <Text style={{ color: colors.dark }}>
              {date}{'\n'}
            </Text>
            <Text style={{ color: colors.medium }}>
              {time}
            </Text>
          </Text>
        </View>
      </View>

      {/* <Text>
          {JSON.stringify(transaction, null, '  ')}, {JSON.stringify(user, null, '  ')}, {JSON.stringify(pocket, null, '  ')}
        </Text> */}
    </ScrollView>
  )


  return (
    <ScreenContainer>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <ScreenContents />
      )}

    </ScreenContainer>
  )
}