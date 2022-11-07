import { useContext } from "react";
import Svg from "react-native-svg";
import { AuthContext } from "../contexts/Auth";
import * as V from 'victory-native'
import { colors, colorScale } from "../constants/Colors";
import { Text, View } from "./Themed";
import { styles } from "../Styles";
import { BusinessCardSm, UserCardSm } from "./Cards";

export function AnalyticsCard({ title, type, rangeName, startDate, endDate, data }: any) {

  const authContext = useContext(AuthContext);

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
              style={{ data: { fill: colorScale[0] } }} />

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
            <Text style={[styles.analyticsMetricText, { color: colors.gold }]} >
              {data[0].numCustomers}
            </Text>
            <Text style={{ color: colors.medium }}>
              {" customers used PocketChange"}
            </Text>
          </Text>
          <Text style={[styles.analyticsNormalText]}>
            <Text style={[styles.analyticsMetricText, { color: colors.blue }]}>
              {data[0].visitRate}
            </Text>
            <Text style={{ color: colors.medium }}>
              {" average visits per week"}
            </Text>
          </Text>
          <Text style={styles.analyticsNormalText}>
            <Text style={[styles.analyticsMetricText, { color: colors.green }]}>
              {data[0].pocketShare}%
            </Text>
            <Text style={{ color: colors.medium }}>
              {" of Uptown Yonge Pocket members visited Sweet Life."}
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
            <Text style={[styles.analyticsMetricText, { color: colors.gold }]} >
              {data[0].numCustomers}
            </Text>
            <Text style={{ color: colors.medium }}>
              {" PocketChange users in Uptown Yonge"}
            </Text>
          </Text>
          <Text style={[styles.analyticsNormalText]}>
            <Text style={[styles.analyticsMetricText, { color: colors.blue }]}>
              {data[0].visitRate}
            </Text>
            <Text style={{ color: colors.medium }}>
              {" average visits per week to participating businesses"}
            </Text>
          </Text>

        </>
      );
    } else if (type == 'text-sales') {
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
    } else if (type == 'list-similar-businesses') {
      const listItems = data.map(
        (item) => <BusinessCardSm navigation={undefined} businessID={item.businessID} showPocket />
      );
      return (
        <View>{listItems}</View>
      );
    } else if (type == 'list-top-customers') {
      const listItems = data.map(
        (item) => <UserCardSm user={item} />
      );
      return (
        <View>{listItems}</View>
      );
    } else if (type == 'pie') {
      const legendData = data.map(
        (item) => ({ name: item.x + " (" + item.y + ")" })
      );
      return (
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
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
    <View style={[styles.card, styles.container]}>
      <View style={styles.analyticsHeaderContainer}>
        <Text style={styles.analyticsTitle}>{title}</Text>
        <Text style={styles.analyticsRange}>{rangeName}</Text>
      </View>
      <View style={styles.analyticsContentContainer}>
        {renderChart()}
      </View>


    </View>
  )
}