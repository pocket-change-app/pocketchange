import { ScrollView, FlatList, SectionList, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { ScreenContainer, Text, View } from '../components/Themed';
import gold from '../constants/Colors';
import { BalancesCard, IdCard, DivHeader, BusinessCardSm } from '../components/Cards';
import { colors, colorScale } from '../constants/Colors';

import { analytics } from '../dummy';

import { React, useState } from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory-native';
import Svg from 'react-native-svg'

const R = require('ramda');

export default function AnalyticsDashboardScreen() {

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState('')

  /* if (isNilOrEmpty(allAnalytics)) {
    return (null)
  } */ 

  const updateSearch = (text: string) => {
    setSearchQuery(text)
    setSearchResults(() => {
        const formattedQuery = text.toLowerCase().trim()
        const results = analytics.map((section) => 
          ({
            sectionTitle: section.sectionTitle,
            data: section.data.filter(a => a.title.toLowerCase().includes(formattedQuery))
          })
        )
        return results
    })
};


  const renderAnalyticsCard = ({ item, index, separators }: { item: any, index: any, separators: any }) => (

    <AnalyticsCard
      key={ item.title } //TODO: is this right?
      title={ item.title }
      type={ item.type }
      data={ item.data }
      startDate={ item.startDate }
      rangeName={ item.rangeName }
    />

  )
  return (

    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={{ flex: 1 }}
        >
      
      <ScreenContainer>
      
        <SectionList
          sections={searchQuery ? searchResults : analytics}
          contentContainerStyle={styles.businessFlatList}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section: { sectionTitle } }) => (
            <View style={styles.analyticsSectionHeaderContainer}>
              <Text style={styles.analyticsSectionHeader}>{sectionTitle}</Text>
            </View>
          )}
          renderItem={renderAnalyticsCard}
          stickySectionHeadersEnabled={false}
          SectionSeparatorComponent={() => <View style={{margin:5}}></View>}
        />

      </ScreenContainer>

      <SearchBar
        showCancel={false}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}

        inputStyle={styles.searchBarInput}
        placeholder="Search Analytics"
        placeholderTextColor={colors.subtle}

        onChangeText={updateSearch}
        onClear={() => null}
        value={searchQuery}/>

    </KeyboardAvoidingView>
    
  );
}

export function AnalyticsCard({ title, type, rangeName, startDate, endDate, data }: any) {

  function renderChart() {
    if (type == 'bar') {
      return (
        <Svg width="100%" height={150}>
          <V.VictoryChart
            standalone={false}
            height={150}
            domainPadding={{ x: 25 }}
            theme={V.VictoryTheme.material}
            padding={{ top: 15, bottom: 35, left: 50, right: 85 }}
          >
            

            <V.VictoryAxis
              fixLabelOverlap={true}
              style={{
                axis: {
                  stroke: colors.subtle
                },
                grid: {
                  stroke: colors.light, //CHANGE COLOR OF X-AXIS GRID LINES
                  strokeDasharray: '3',
                }
              }}
            />

            <V.VictoryAxis 
              dependentAxis
              style={{
                axis: {
                  stroke: colors.subtle
                },
                grid: {
                  stroke: colors.light, //CHANGE COLOR OF X-AXIS GRID LINES
                  strokeDasharray: '3',
                }
              }} />

            <V.VictoryBar 
              data={data} 
              x="x" 
              y="y" 
              style={{ data: { fill: colorScale[0] } }}/>
            
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
            padding={{ top: 15, bottom: 35, left: 50, right: 85 }}
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
    } else if (type == 'text-participation-business') {
      return (
        <>
          <Text style={styles.analyticsNormalText}>
            <Text style={[styles.analyticsMetricText, {color: colors.gold}]} >
              {data[0].numCustomers}
            </Text>
            <Text style={{color: colors.medium}}>
              {" customers used PocketChange at {insert active store}."} 
            </Text>
          </Text>
          <Text style={[styles.analyticsNormalText, {textAlign:'right'}]}>
            <Text style={{color: colors.medium}}>
              {"the average customer visits "} 
            </Text>
            <Text style={[styles.analyticsMetricText, {color: colors.blue}]}>
              {data[0].visitRate}x
            </Text>
            <Text style={{color: colors.medium}}>
              {" per week"}
            </Text>
          </Text>
          <Text style={styles.analyticsNormalText}>
            <Text style={[styles.analyticsMetricText, {color: colors.green}]}>
              {data[0].pocketShare}%
            </Text>
            <Text style={{color: colors.medium}}>
              {" of { insert active pocket } Pocket members visited { insert active business }"}
            </Text>
          </Text>
      </>
      );
    } else if (type == 'text-participation-pocket') {
      return (
        <>
        <Text style={styles.analyticsNormalText}>
          {/* <Text style={{color: colors.medium}}>
            {"There are "} 
          </Text> */}
          <Text style={[styles.analyticsMetricText, {color: colors.gold}]} >
            {data[0].numCustomers}
          </Text>
          <Text style={{color: colors.medium}}>
            {" PocketChange users in {insert active pocket}"} 
          </Text>
        </Text>
        <Text style={[styles.analyticsNormalText, {textAlign:'right'}]}>
          <Text style={{color: colors.medium}}>
            {"each averaged "}
          </Text>
          <Text style={[styles.analyticsMetricText, {color: colors.blue}]}>
            {data[0].visitRate}
          </Text>
          <Text style={{color: colors.medium}}>
            {" visits per week to businesses in the Pocket"}
          </Text>
        </Text>
        
        </>
      );
    }else if (type == 'text-sales') {
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
                color: colors.green,
                justifyContent: 'flex-end',
                lineHeight: 30}} >${data.net_sales}</Text>
            </View>
          </View>

        </View>
      );
    } else if (type == 'list-similar-businesses') {
      const listItems = data.map(
        (item) => <BusinessCardSm navigation={undefined} business={item}/>
      );
      return (
        <View>{listItems}</View>
      );
    } else if (type == 'list-top-customers') {
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
              colorScale={colorScale}
              data={data}
              x="x"
              y="y" />
            </Svg>
            <Svg width={180} height={150}>
            <V.VictoryLegend
              y={10}
              height={50}
              //itemsPerRow={2}
              standalone={false}
              theme={V.VictoryTheme.material}
              colorScale={colorScale}
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
      <View style={styles.analyticsHeaderContainer}>
          <Text style={styles.analyticsTitle}>{ title }</Text>
          <Text style={styles.analyticsRange}>{ rangeName }</Text>
      </View>
      <View style={styles.analyticsContentContainer}>
        {renderChart()}
      </View>
      

    </View>
  )
}