import { color, fonts, ScreenHeight, ScreenWidth } from '@rneui/base';
import { getBackgroundColorAsync } from 'expo-system-ui';
import { visitWithTypeInfo } from 'graphql';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from './components/Themed';
import { colors } from './constants/Colors';

export const MARGIN = 15
export const MARGIN_SM = 8
export const CARD_RADIUS = 10
export const BORDER_WIDTH = 2

export const styles = StyleSheet.create({

  navigationHeader: {
    height: 100,
    backgroundColor: colors.bg,
    // borderBottomWidth: 2,
    borderWidth: 0
  },
  navigationHeaderTitle: {
    fontSize: 30,
    fontFamily: 'metropolis black italic',
    color: colors.subtle,
  },
  tabBar: {
    height: 100,
    backgroundColor: colors.bg,
    // borderTopWidth: BORDER_WIDTH,
    borderWidth: 0,
    borderColor: colors.light,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    borderTopWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: colors.light,
  },

  searchBarContainer: {
    height: 60,
    paddingHorizontal: MARGIN,
    backgroundColor: colors.bg,
    borderTopColor: colors.light,
    borderBottomColor: colors.light,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // borderWidth: 0,
    justifyContent: 'center',
  },

  searchBarInputContainer: {
    height: '100%',
    backgroundColor: colors.imageBorder,
    borderRadius: CARD_RADIUS,
  },

  searchBarInput: {
    fontFamily: 'metropolis medium',
    fontSize: 16,
    color: colors.subtle,
  },

  card: {
    //flex: 1,
    marginBottom: MARGIN,
    backgroundColor: colors.card,
    borderColor: colors.light,
    borderWidth: BORDER_WIDTH,
    borderRadius: CARD_RADIUS,
    // padding: 15,
  },

  cardHeader: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    height: 45,
    // alignContent: 'center',
    // justifyContent: 'center',
  },

  cardHeaderText: {
    textTransform: 'uppercase',
    fontFamily: 'metropolis medium',
    fontSize: 21,
    textAlign: 'center',
    color: colors.subtle,
  },

  cardHeaderTextContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  horizontalLine: {
    backgroundColor: colors.light,
    height: BORDER_WIDTH,
    marginHorizontal: MARGIN_SM,
    borderRadius: 1
  },

  verticalLine: {
    backgroundColor: colors.light,
    width: BORDER_WIDTH,
    marginVertical: MARGIN_SM,
    borderRadius: 1
  },

  changeLg: {
    // backgroundColor: 'rgba(0,0,0,0.1)',
    fontFamily: 'metropolis extrabold',
    fontSize: 34,
    color: colors.gold,
    height: 34
  },

  changeSm: {
    fontFamily: 'metropolis extrabold',
    fontSize: 18,
    color: colors.gold
  },

  transparent: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
  },

  alignRight: {
    textAlign: 'right'
  },

  businessListItemCard: {
    flexDirection: 'row', // makes the image and text next to each other
    height: 100,
  },

  pocketChangeBalanceCard: {
    alignItems: "center",
    padding: MARGIN,
  },

  cardTitle: {
    textTransform: 'uppercase',
    fontSize: 18,
    marginBottom: 10,
    color: colors.subtle,
    fontFamily: 'metropolis regular',
  },

  businessNameSm: {
    fontSize: 20,
    //lineHeight: 20,
    fontFamily: 'metropolis black',
    color: colors.dark,
  },

  businessNameLg: {
    fontSize: 26,
    //lineHeight: 20,
    fontFamily: 'metropolis black',
    color: colors.dark,
  },

  address: {
    textTransform: 'uppercase',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'metropolis medium',
    color: colors.medium,
  },

  pocket: {
    textTransform: 'uppercase',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'metropolis bold italic',
    color: colors.subtle,
  },

  pocketBig: {
    //textTransform: 'uppercase',
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'metropolis black italic',
    color: colors.subtle,
  },

  changeBig: {
    fontSize: 30,
    fontFamily: 'metropolis black italic',
    color: colors.gold,
  },


  container: {
    padding: MARGIN,
  },

  businessFlatList: {
    padding: MARGIN,
    paddingBottom: 0,
  },

  businessHeaderImageContainer: {
    width: '100%',
    height: 125,

  },

  businessHeaderImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: CARD_RADIUS - BORDER_WIDTH,
    borderTopRightRadius: CARD_RADIUS - BORDER_WIDTH,
  },

  businessListImageContainer: {
    //width: "25%",
    height: "100%",
    aspectRatio: 1,
    // margin: 0,
    // marginRight: 0,
  },

  businessListImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    // borderRadius: 8,
    // borderWidth: 2,
    // borderColor: colors.imageBorder,
    borderTopLeftRadius: CARD_RADIUS - BORDER_WIDTH,
    borderBottomLeftRadius: CARD_RADIUS - BORDER_WIDTH,

  },

  businessListInfo: {
    justifyContent: 'center',
    margin: MARGIN,
  },

  businessModalInfo: {
    margin: MARGIN,
  },

  businessBioText: {
    fontFamily: 'metropolis regular',
    fontSize: 14,
    lineHeight: 17,
    color: colors.dark,
    textAlign: 'justify',
    marginBottom: MARGIN
  },

  signatureImage: {
    aspectRatio: 1,
    width: 40,
    borderWidth: BORDER_WIDTH,
    borderRadius: 100,
    borderColor: colors.imageBorder,
    marginRight: MARGIN_SM,
  },

  signatureText: {
    fontFamily: 'metropolis medium',
    fontSize: 14
  },

  payButton: {
    borderRadius: CARD_RADIUS,
    marginTop: MARGIN,
    height: 40,
    backgroundColor: colors.gold,

    justifyContent: 'center',
    alignItems: 'center',
  },

  payButtonText: {
    fontFamily: 'metropolis black italic',
    fontSize: 18,
    color: colors.bg,
  },

  idCard: {
    width: "100%",
    aspectRatio: 1.64,
    padding: MARGIN,
    justifyContent: 'space-between',
  },

  idImageContainer: {
    height: "100%",
    aspectRatio: 1,
  },

  idImage: {
    aspectRatio: 1,
    width: 106,
    height: 106,
    borderRadius: 60,
    marginLeft: 25,
    borderWidth: BORDER_WIDTH,
    borderColor: colors.imageBorder,
  },

  idHeader: {
    height: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  idContent: {
    justifyContent: 'center',
    padding: MARGIN
  },

  idFirstName: {
    textTransform: 'uppercase',
    fontFamily: 'metropolis bold',
    fontSize: 14,
    color: colors.medium,
  },

  idLastName: {
    textTransform: 'uppercase',
    fontFamily: 'metropolis bold',
    fontSize: 18,
    color: colors.gold,
  },

  idLifeTimeChange: {
    fontFamily: 'metropolis medium',
    fontSize: 14,
    color: colors.subtle,
  },

  idDateOfBirth: {
    fontFamily: 'metropolis medium',
    fontSize: 11,
    color: colors.medium,
  },

  idAppName: {
    fontFamily: 'metropolis black italic',
    fontSize: 18,
    color: colors.subtle,
  },

  idText: {
    fontFamily: 'metropolis medium',
    fontSize: 11,
    color: colors.subtle,
  },

  balanceCard: {
    width: "100%",
    aspectRatio: 1.64,
    // justifyContent: 'space-between',
  },

  balanceCardColumn: {
    // backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    // height: '100%',
    // justifyContent: 'space-between',
  },

  balanceCardContent: {
    // backgroundColor: 'rgba(0,0,0,0.1)',
    margin: MARGIN,
    flex: 1,
    // justifyContent: 'space-evenly',
  },

  flexFill: {
    flex: 100,
  },

  pocketFlatList: {
    // padding: MARGIN,
    margin: 0,
  },

  pocketListCardContainer: {
    width: Dimensions.get('window').width - 4 * MARGIN,
    height: '100%', //Dimensions.get('window').height - 200,
  },

  pocketListCard: {
    flex: 1,
    height: '100%',
    // marginRight: 15,
    justifyContent: 'space-between',
  },

  pocketListName: {
    fontFamily: 'metropolis black italic',
    fontSize: 46,
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  pocketListNameContainer: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    marginBottom: MARGIN,
  },

  pocketListImageContainer: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    aspectRatio: 4 / 5,
    //flex: 1,
  },

  pocketListImage: {
    flex: 4,
    width: undefined,
    height: undefined,

    borderRadius: CARD_RADIUS,
  },

  setting: {
    height: 45,
  },

  settingText: {
    fontFamily: 'metropolis medium',
    fontSize: 16,
    color: colors.medium,
  }
})