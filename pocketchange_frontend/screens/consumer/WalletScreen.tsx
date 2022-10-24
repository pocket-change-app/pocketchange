import { RefreshControl, ScrollView } from 'react-native';

import { MARGIN, styles } from '../../Styles';
import { ScreenContainer, View } from '../../components/Themed';
import { IdCard, HistoryCard, DivHeader } from '../../components/Cards';
import { useCallback, useState } from 'react';
import wait, { waitTimes } from '../../utils/wait';

export default function WalletScreen({ navigation }: { navigation: any }) {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      wait(waitTimes.RefreshScreen),
    ]).then(() => setRefreshing(false));
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.container}
        nestedScrollEnabled={false}>

        <IdCard />
        {/* // TODO: connect to change balance resolver  */}
        {/* <BalancesCard /> */}

        <DivHeader text='History' />

        <HistoryCard navigation={navigation} />

        <View style={{ height: MARGIN }} />
      </ScrollView>
    </ScreenContainer>
  );
}
