import { ScrollView, FlatList } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import gold from '../constants/Colors';
import { BalancesCard, IdCard } from '../components/Cards';
import { colors } from '../constants/Colors';

import { analytics } from '../dummy';

import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory-native';
import Svg from 'react-native-svg'


export default function AnalyticsDashboardScreen() {

  const state = {
    search: '',
  }


  const renderAnalyticsCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (

    <AnalyticsCard
      title={ item.title }
      type={ item.type }
      data={ item.data }
      startDate={ item.startDate }
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

export function AnalyticsCard({ title, type, startDate, endDate, data }: any) {

  function renderChart() {
    if (type == 'bar') {
      return (
        <Svg width="100%" height={150}>
          <V.VictoryChart
            standalone={false}
            height={150}
            domainPadding={{ x: 25 }}
            theme={V.VictoryTheme.material}
            padding={{ top: 15, bottom: 35, left: 40, right: 65 }}
          >
            <V.VictoryAxis
              fixLabelOverlap={true}
              style={{
                //tickLabels: {angle: -0},
              }}
            />
            <V.VictoryAxis dependentAxis />
            <V.VictoryBar data={data} x="x" y="y" />
          </V.VictoryChart>
        </Svg>
      );
    } else if (type == 'line') {
      return (
        <Svg width="100%" height={150}>
          <V.VictoryChart
            standalone={false}
            height={150}
            domainPadding={{ x: 25 }}
            theme={V.VictoryTheme.material}
            padding={{ top: 15, bottom: 35, left: 50, right: 75 }}
          >
            <V.VictoryAxis
              fixLabelOverlap={true}
              style={{
                //tickLabels: {angle: -30}
              }}
            />
            <V.VictoryAxis dependentAxis />
            <V.VictoryLine data={data} x="x" y="y" />
          </V.VictoryChart>
        </Svg>
      );
    } else if (type == 'text') {
      return <Text style={styles.changeLg} >{data}</Text>;
    } else if (type == 'text-sales') {
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{
                  fontFamily: 'metropolis medium', 
                  fontSize: 14,
                  color: colors.subtle,
                  justifyContent: 'flex-start',
                  lineHeight: 30}} >
                  GROSS SALES</Text>
              </View>
              <View>
                <Text style={{
                  fontFamily: 'metropolis extrabold', 
                  fontSize: 24,
                  color: colors.gold,
                  textAlign: "right",
                  lineHeight: 30}} >${data.gross_sales}</Text>
              </View>
          </View>

          <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{
                  fontFamily: 'metropolis medium', 
                  fontSize: 14,
                  color: colors.subtle,
                  justifyContent: 'flex-start',
                  lineHeight: 30}} >
                  CHANGE ISSUED</Text>
              </View>
              <View>
                <Text style={{
                  fontFamily: 'metropolis extrabold', 
                  fontSize: 20,
                  color: colors.subtle,
                  textAlign: "right",
                  lineHeight: 30}} >${data.change_issued}</Text>
              </View>
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{
                fontFamily: 'metropolis medium', 
                fontSize: 14,
                color: colors.subtle,
                justifyContent: 'flex-start',
                lineHeight: 30}} >
                REFUNDS</Text>
            </View>
            <View>
              <Text style={{
              fontFamily: 'metropolis extrabold', 
              fontSize: 20,
              color: colors.subtle,
              textAlign: "right",
              lineHeight: 30}} >${data.refunds_issued}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{
                fontFamily: 'metropolis medium', 
                fontSize: 14,
                color: colors.subtle,
                justifyContent: 'flex-start',
                lineHeight: 30}} >
                NET SALES</Text>
            </View>
            <View>
              <Text style={{
                fontFamily: 'metropolis extrabold', 
                fontSize: 20,
                color: "green",
                justifyContent: 'flex-end',
                lineHeight: 30}} >${data.net_sales}</Text>
            </View>
          </View>

        </View>
      );
    } else if (type == 'list') {
      const listItems = data.map(
        (item) => <Text>{item}</Text>
      );
      return (
        <View>{listItems}</View>
      );
    } else if (type == 'pie') {
      const legendData = data.map(
        (item) => ({ name: item.x + " (" + item.y + ")" })
      );
      return (
        <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
          <Svg width={120} height={150}>
            <V.VictoryPie
              standalone={false}
              height={150}
              width={100}
              padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
              //labelPlacement="parallel"
              //labelPosition="centroid"
              labelComponent={<></>}
              //startAngle={0}
              //endAngle={180}
              //labelRadius={0}
              innerRadius={20}
              //padAngle={1}
              theme={V.VictoryTheme.material}
              data={data}
              x="x"
              y="y" />
            </Svg>
            <Svg width={200} height={150}>
            <V.VictoryLegend
              y={10}
              height={50}
              //itemsPerRow={2}
              standalone={false}
              theme={V.VictoryTheme.material}
              orientation='vertical'
              data={legendData}
            //height={200}
            />
          </Svg>
        </View>
      );
    }
  }

  return (
    <View style={[styles.card, styles.analyticsCard]}>
      
      <Text style={styles.analyticsTitle}>{ title }</Text>

      {renderChart()}

    </View>
  )
}