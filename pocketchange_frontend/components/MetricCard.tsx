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
import useGetBusinessPocketsQuery from "../hooks-apollo/Pocket/useGetBusinessPocketsQuery";
import Hyphenated from 'react-hyphen'

export default function MetricCard({ title, subtitle, type, rangeName, startDate, endDate, data }: any) {

  const authContext = useContext(AuthContext);
  const businessID = authContext.activeRole.entityID;
  const { data: pocketsData, loading: pocketLoading, error: pocketError, refetch: refetchPockets } = useGetBusinessPocketsQuery(businessID);

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
          <View style={styles.textContainer}>
            <Text style={styles.metricsNormalText}>
              {`PocketChange was used by `}
              <Text style={[styles.metricsMetricText, { color: colors.gold }]} >
                {data[0].numCustomers}
              </Text>
              {` customers at ${authContext?.activeRole?.entityName} who each visited `}
              <Text style={[styles.metricsMetricText, { color: colors.blue }]}>
                {data[0].visitRate}x
              </Text>
              {" per week, on average. "}

              {/* {'\n\n'} */}

              {`${authContext?.activeRole?.entityName} customers comprise `}
              <Text style={[styles.metricsMetricText, { color: colors.green }]}>
                {data[0].pocketShare}%
              </Text>
              {` of all ${pocketsData?.getBusinessPockets[0]?.pocketName} pocket members.`}
            </Text>
          </View>
        );

      case 'text-participation-pocket':
        return (
          <View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.metricsNormalText, styles.metricsMetricText, { color: colors.gold, width: 70 }]} >
                {`${data[0].numCustomers}`}
              </Text>
              <Text style={[styles.metricsNormalText, { flex: 1 }]} >
                {`members in Uptown Yonge` //TODO: make this not hard coded but not like below
                //`members in ${pocketsData?.getBusinessPockets[0]?.pocketName}`
                }
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.metricsNormalText, styles.metricsMetricText, { color: colors.blue, width: 70 }]} >
                {data[0].visitRate}
              </Text>
              <Text style={[styles.metricsNormalText, { flex: 1 }]} >
                {`average weekly visits per customer to participating businesses`}
              </Text>
            </View>

          </View>
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
          <View style={[styles.textContainer, { flexDirection: 'row' }]}>
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
                radius={Dimensions.get('window').width / 8}
                innerRadius={Dimensions.get('window').width / 20}
                //padAngle={1}
                theme={V.VictoryTheme.material}
                colorScale={colorScale}
                data={data}
                x="x"
                y="y"
              />
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
        {subtitle ? <Text style={[styles.textContainer, styles.metricsNormalText, { textAlign: 'left' }]}>{subtitle}</Text> : null}
        <TheMetric />
      </View>


    </View>
  )
}