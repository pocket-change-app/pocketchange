import { useContext } from "react";
import Svg, { G } from "react-native-svg";
import { AuthContext } from "../contexts/Auth";
import * as V from 'victory-native'
import { colors, colorScale } from "../constants/Colors";
import { Text, View } from "./Themed";
import { MARGIN, styles } from "../Styles";
import { BusinessCardSm, UserCardSm } from "./Cards";
import { HorizontalLine } from "./Lines";
import { Dimensions, FlatList } from "react-native";

export default function MetricCard({ title, type, rangeName, startDate, endDate, data }: any) {

  const authContext = useContext(AuthContext);

  const TheMetric = () => {
    switch (type) {

      case 'bar':
        return (
          <Svg width='100%' height={150}>
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
                    stroke: colors.subtle,
                  },
                  grid: {
                    stroke: colors.light, //CHANGE COLOR OF X-AXIS GRID LINES
                    strokeDasharray: '3',
                  },
                  ticks: {
                    stroke: colors.subtle
                  }
                }}
              />

              <V.VictoryAxis
                dependentAxis
                style={{
                  axis: {
                    stroke: colors.subtle,
                  },
                  grid: {
                    stroke: colors.light, //CHANGE COLOR OF X-AXIS GRID LINES
                    strokeDasharray: '3',
                  },
                  ticks: {
                    stroke: colors.subtle
                  }
                }} />

              <V.VictoryBar
                data={data}
                x="x"
                y="y"
                style={{ data: { fill: colorScale[0] } }} />

            </V.VictoryChart>
          </Svg>
        );

      case 'line':
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

      case 'text-participation-business':
        return (
          <>
            <Text style={styles.metricsNormalText}>
              <Text style={[styles.metricsMetricText, { color: colors.gold }]} >
                {data[0].numCustomers}
              </Text>
              <Text style={{ color: colors.medium }}>
                {" customers used PocketChange"}
              </Text>
            </Text>
            <Text style={[styles.metricsNormalText]}>
              <Text style={[styles.metricsMetricText, { color: colors.blue }]}>
                {data[0].visitRate}
              </Text>
              <Text style={{ color: colors.medium }}>
                {" average visits per week"}
              </Text>
            </Text>
            <Text style={styles.metricsNormalText}>
              <Text style={[styles.metricsMetricText, { color: colors.green }]}>
                {data[0].pocketShare}%
              </Text>
              <Text style={{ color: colors.medium }}>
                {" of Uptown Yonge Pocket members visited Sweet Life."}
              </Text>
            </Text>
          </>
        );

      case 'text-participation-pocket':
        return (
          <>
            <Text style={styles.metricsNormalText}>
              {/* <Text style={{color: colors.medium}}>
              {"There are "} 
            </Text> */}
              <Text style={[styles.metricsMetricText, { color: colors.gold }]} >
                {data[0].numCustomers}
              </Text>
              <Text style={{ color: colors.medium }}>
                {" PocketChange users in Uptown Yonge"}
              </Text>
            </Text>
            <Text style={[styles.metricsNormalText]}>
              <Text style={[styles.metricsMetricText, { color: colors.blue }]}>
                {data[0].visitRate}
              </Text>
              <Text style={{ color: colors.medium }}>
                {" average visits per week to participating businesses"}
              </Text>
            </Text>

          </>
        );

      case 'text-sales':
        return (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'metropolis medium',
                  fontSize: 14,
                  color: colors.subtle,
                  justifyContent: 'flex-start',
                  lineHeight: 30
                }} >
                  GROSS SALES</Text>
              </View>
              <View>
                <Text style={{
                  fontFamily: 'metropolis extrabold',
                  fontSize: 24,
                  color: colors.gold,
                  textAlign: "right",
                  lineHeight: 30
                }} >${data.gross_sales}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'metropolis medium',
                  fontSize: 14,
                  color: colors.subtle,
                  justifyContent: 'flex-start',
                  lineHeight: 30
                }} >
                  CHANGE ISSUED</Text>
              </View>
              <View>
                <Text style={{
                  fontFamily: 'metropolis extrabold',
                  fontSize: 20,
                  color: colors.subtle,
                  textAlign: "right",
                  lineHeight: 30
                }} >${data.change_issued}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'metropolis medium',
                  fontSize: 14,
                  color: colors.subtle,
                  justifyContent: 'flex-start',
                  lineHeight: 30
                }} >
                  REFUNDS</Text>
              </View>
              <View>
                <Text style={{
                  fontFamily: 'metropolis extrabold',
                  fontSize: 20,
                  color: colors.subtle,
                  textAlign: "right",
                  lineHeight: 30
                }} >${data.refunds_issued}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'metropolis medium',
                  fontSize: 14,
                  color: colors.subtle,
                  justifyContent: 'flex-start',
                  lineHeight: 30
                }} >
                  NET SALES</Text>
              </View>
              <View>
                <Text style={{
                  fontFamily: 'metropolis extrabold',
                  fontSize: 20,
                  color: colors.green,
                  justifyContent: 'flex-end',
                  lineHeight: 30
                }} >${data.net_sales}</Text>
              </View>
            </View>

          </View>
        );

      case 'list-similar-businesses':
        const businesses = data.map(
          (item) => <BusinessCardSm navigation={undefined} businessID={item.businessID} showPocket />
        );
        const renderBusiness = ({ item, index, separators }) => (
          <BusinessCardSm
            navigation={undefined}
            businessID={item.businessID}
            showPocket
          />
        )
        const BusinessSeparatorComponent = () => (
          <View style={{ height: MARGIN }} />
        )
        return (
          <FlatList
            data={data}
            renderItem={renderBusiness}
            ItemSeparatorComponent={BusinessSeparatorComponent}
          />
        );

      case 'list-top-customers':
        const users = data.map(
          (item) => <UserCardSm user={item} />
        );
        return (

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            {users}
          </View>
        );

      case 'pie':
        const legendData = data.map(
          (item) => ({ name: item.x + " (" + item.y + ")" })
        );
        return (
          <V.VictoryPie
            // standalone={true}
            // height={150}
            // width={300}
            // padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
            // labelPlacement="parallel"
            // labelPosition='startAngle'
            labelComponent={<></>}
            // startAngle={-90}
            // endAngle={90}
            // labelRadius={200}
            radius={Dimensions.get('window').width / 4}
            innerRadius={Dimensions.get('window').width / 10}
            //padAngle={1}
            theme={V.VictoryTheme.material}
            colorScale={colorScale}
            data={data}
            height={200}
          // x="x"
          // y="y"
          />

        );

      default:
        return (
          <View style={[styles.card, styles.container]}>
            <Text style={styles.errorText}>
              Error: no match for received type in MetricCard
            </Text>
          </View>
        )
    }
  }

  return (
    <View style={[styles.card]}>
      <View style={[styles.container, styles.metricsHeaderContainer]}>
        <Text style={styles.metricsTitle}>{title}</Text>
        <Text style={styles.metricsRange}>{rangeName}</Text>
      </View>

      <HorizontalLine />

      <View style={[styles.container]}>
        <TheMetric />
      </View>


    </View>
  )
}