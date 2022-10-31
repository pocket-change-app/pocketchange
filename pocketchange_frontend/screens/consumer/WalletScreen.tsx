import { FlatList, RefreshControl } from 'react-native';

import { BORDER_WIDTH, CARD_RADIUS, MARGIN, MARGIN_SM, styles } from '../../Styles';
import { ScreenContainer, Text, View, ViewProps } from '../../components/Themed';
import { IdCard, DivHeader, QRScanListed, TransactionListed, HistoryEntry } from '../../components/Cards';
import { Children, useCallback, useContext, useState } from 'react';
import wait, { waitTimes } from '../../utils/wait';
import { useGetAllTransactionsQuery, useGetAllQRScansQuery } from '../../hooks-apollo';
import { AuthContext } from '../../contexts/Auth';
import { HorizontalLine } from '../../components/Lines';
import { colors } from '../../constants/Colors';


export default function WalletScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext)
  const userID = authContext.userFirebase.uid

  const transactionsQuery = useGetAllTransactionsQuery(undefined, undefined, userID, undefined, undefined)
  const { data: transactionsData, loading: transactionsLoading, error: transactionsError, refetch: refetchTransactions } = transactionsQuery


  const QRScansQuery = useGetAllQRScansQuery(userID)
  const { data: QRScansData, loading: QRScansLoading, error: QRScansError, refetch: refetchQRScans } = QRScansQuery


  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
      refetchQRScans,
    ]).then(() => setRefreshing(false));
  }, []);

  // Construct list of all transactions and scans
  var allItems = []

  for (var i in transactionsData?.getAllTransactions) {
    const t = transactionsData?.getAllTransactions[i]
    const dateSecs = new Date(t.date).getTime()
    allItems.push(
      t
    )
    console.log(t.date)
    console.log(console.log(dateSecs))
  }

  for (var i in QRScansData?.getAllQRScans) {
    const s = QRScansData?.getAllQRScans[i]
    const dateSecs = new Date(s.date).getTime()
    allItems.push(
      s
    )

  }
  // Sort by date
  allItems.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

  // console.log(JSON.stringify(allItems, null, '  '));



  const ListHeaderComponent = () => (
    <View style={{ zIndex: 200 }}>

      <IdCard />

      <DivHeader text='History' />

      <View style={[
        styles.card,
        {
          borderBottomWidth: 0,
          marginBottom: -CARD_RADIUS,
          height: CARD_RADIUS * 2,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          // backgroundColor: colors.testing,
        }
      ]} />

    </View>
  )

  const ListFooterComponent = () => (
    <View style={[
      styles.card,
      {
        borderTopWidth: 0,
        marginBottom: 0,
        height: CARD_RADIUS * 2,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        // backgroundColor: colors.testing,
        marginTop: -CARD_RADIUS,
      }
    ]} />
  )

  const ItemSeparatorComponent = () => (
    <View style={[
      styles.card,
      {
        borderRadius: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 0,
        paddingVertical: MARGIN / 2,
        zIndex: 10,
      }
    ]}>
      <HorizontalLine />
    </View>
  )

  const ListEmptyComponent = () => (
    <View style={[styles.card, styles.transactionListed, { justifyContent: 'center' }]}>
      <Text style={[styles.transactionListedMerchantText, { textAlign: 'center', color: colors.subtle }]}>
        Your QR scans and transactions will appear here.
      </Text>
    </View>
  )

  const renderItem = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <HistoryEntry
      navigation={navigation}
      item={item}
    />
  )

  const CellRendererComponent = (props: ViewProps) => (
    <View style={{ zIndex: 10 }}>
      <View {...props} />
    </View>
  )

  if (transactionsError) return (<Text>{transactionsError.message}</Text>)
  if (QRScansError) return (<Text>{QRScansError.message}</Text>)

  return (
    <ScreenContainer>

      <FlatList
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={styles.container}
        data={allItems}
        renderItem={renderItem}
        CellRendererComponent={CellRendererComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={ListEmptyComponent}
      />

    </ScreenContainer>
  );
}
