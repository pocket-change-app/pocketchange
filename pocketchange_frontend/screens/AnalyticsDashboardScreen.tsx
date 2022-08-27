import { ScrollView, FlatList } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import gold from '../constants/Colors';
import { BalancesCard, IdCard, AnalyticsCard } from '../components/Cards';

import { analytics } from '../dummy';


export default function AnalyticsDashboardScreen() {

  const state = {
    search: '',
  }


  const renderAnalyticsCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (

    <AnalyticsCard
      title={ item.title }
      type={ item.type }
      data={ item.data }
    />

  )

  const updateSearch = (search: string) => {
    state.search = search;
  };

  console.log(analytics)
  const { search } = state;

  return (

    <>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        round
        placeholder="Search Analytics"
        onChangeText={updateSearch}
        value={search}
      />
      <ScreenContainer>
        <FlatList
          contentContainerStyle={styles.businessFlatList}
          data={analytics}
          renderItem={renderAnalyticsCard}
        />
      </ScreenContainer>
    </>
    
  );
}