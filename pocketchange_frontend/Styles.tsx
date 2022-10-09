import { color, fonts, ScreenHeight, ScreenWidth } from '@rneui/base';
import { getBackgroundColorAsync } from 'expo-system-ui';
import { visitWithTypeInfo } from 'graphql';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from './components/Themed';
import { colors } from './constants/Colors';

export const MARGIN = 12
export const MARGIN_SM = MARGIN / 2
export const CARD_RADIUS = MARGIN
export const BORDER_WIDTH = 1
export const BUTTON_HEIGHT = 50
const CREDIT_CARD_ASPECT_RATIO = (1 + Math.sqrt(5)) / 2 // 1.64
// const POCKET_CARD_ASPECT_RATIO = 4 / 7 // 5 / 6 // 1 / CREDIT_CARD_ASPECT_RATIO
export const POCKET_CARD_SCREEN_MARGIN = (3 * MARGIN)

export const styles = StyleSheet.create({

  inputContainer: {
    // width: '',
    padding: MARGIN,
    // paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    // borderBottomWidth: BORDER_WIDTH,
    borderColor: colors.subtle,
  },

  signUpInputText: {
    borderWidth: BORDER_WIDTH,
    borderColor: colors.light,
    borderRadius: CARD_RADIUS,
    backgroundColor: colors.card,
    padding: MARGIN / 2,
  },

  paymentFocusText: {
    fontFamily: 'receipt',
    fontSize: 50,
    color: colors.gold,
  },

  tipButtonText: {
    textAlign: 'center',
    fontFamily: 'receipt',
    fontSize: 30,
    color: colors.gold,
  },

  paymentAmountText: {
    fontFamily: 'metropolis bold',
    fontSize: 30,
    color: colors.subtle,
  },

  paymentSummaryText: {
    fontFamily: 'receipt',
    fontSize: 25,
    // lineHeight: 21,
    color: colors.medium,
  },

  container: {
    padding: MARGIN,
  },

  image: {
    borderWidth: BORDER_WIDTH,
    borderColor: colors.imageBorder,
    borderRadius: CARD_RADIUS - BORDER_WIDTH,
  },

  prose: {
    fontFamily: 'metropolis medium',
    fontSize: 14,
    lineHeight: 17,
    color: colors.dark,
    textAlign: 'justify',
  },

  receipt: {
    fontFamily: 'receipt',
    fontSize: 26,
    lineHeight: 26,
    color: colors.dark,
  },

  navigationHeader: {
    height: 100,
    backgroundColor: colors.bg,
  },
  navigationHeaderTitle: {
    fontSize: 25,
    fontFamily: 'metropolis black italic',
    color: colors.subtle,
    // width: '100%',
  },

  navigationHeaderPocketTitle: {
    fontSize: 18,
    fontFamily: 'metropolis black italic',
    color: colors.subtle,
  },

  navigationBackTitleStyle: {
    fontSize: 16,
    fontFamily: 'metropolis medium',
  },

  tabBar: {
    height: 100,
    backgroundColor: colors.bg,
    borderTopWidth: 0,
    // borderWidth: 0,
    borderColor: colors.light,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    // borderTopColor: 'transparent',
  },

  searchBarContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: MARGIN,
    // paddingVertical: MARGIN,
    backgroundColor: 'rgba(0,0,0,0,1)', //colors.bg,
    justifyContent: 'center',
  },

  searchBarInputContainer: {
    height: 40,
    backgroundColor: colors.bgLight, //colors.bg,
    borderRadius: CARD_RADIUS,
    borderColor: colors.light,
    borderWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    justifyContent: 'center',
  },

  searchBarInput: {
    fontFamily: 'metropolis medium',
    fontSize: 16,
    lineHeight: 16,
    // lineHeight: 25,
    color: colors.medium,
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

  divHeader: {
    paddingBottom: MARGIN_SM,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  divHeaderTextContainer: {
    borderColor: colors.light,
    // borderBottomWidth: BORDER_WIDTH,
    // borderRadius: CARD_RADIUS,
    paddingVertical: MARGIN / 4,
    paddingHorizontal: MARGIN / 2,
  },

  cardHeader: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 5,
    height: 40,
    // alignContent: 'center',
    justifyContent: 'center',
  },

  cardHeaderText: {
    textTransform: 'uppercase',
    fontFamily: 'metropolis regular',
    fontSize: 18,
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
    // height: 34
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
    height: 80,
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

  pocketTitle: {
    fontSize: 25,
    lineHeight: 35,
    //paddingBottom: MARGIN,
    //textAlign: 'center',
    fontFamily: 'metropolis black italic',
    //color: colors.dark,
    color: colors.dark,
    //position: 'absolute', bottom: 0,

  },

  pocketBig: {
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

  businessFlatList: {
    flexGrow: 1,
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

  pocketHeaderImageContainer: {
    width: '100%',
    height: 150,
  },

  pocketHeaderImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
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

  // businessBioText: {
  //   fontFamily: 'metropolis regular',
  //   fontSize: 14,
  //   lineHeight: 17,
  //   color: colors.dark,
  //   textAlign: 'justify',
  //   marginBottom: MARGIN
  // },

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
    height: BUTTON_HEIGHT,
    backgroundColor: colors.gold,

    justifyContent: 'center',
    alignItems: 'center',
  },

  payButtonText: {
    fontFamily: 'metropolis black italic',
    fontSize: 18,
    color: colors.bg,
  },

  buttonBordered: {
    justifyContent: 'center',
    borderWidth: BORDER_WIDTH,
    borderColor: colors.light,
    borderRadius: CARD_RADIUS,
    // marginTop: MARGIN,
    height: BUTTON_HEIGHT,
    backgroundColor: 'transparent',

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonBorderedText: {
    // fontFamily: 'metropolis medium',
    fontSize: 18,
    color: colors.subtle,
  },

  buttonNegative: {
    justifyContent: 'center',
    height: BUTTON_HEIGHT,
    padding: MARGIN,
    backgroundColor: colors.subtle,
    borderRadius: CARD_RADIUS,
  },

  buttonNegativeText: {
    color: colors.card,
  },

  idCard: {
    width: "100%",
    aspectRatio: CREDIT_CARD_ASPECT_RATIO,
    padding: MARGIN,
    justifyContent: 'space-between',
  },

  idCardContent: {
    flexDirection: 'row',
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
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

  idIcon: {
    //aspectRatio: 1,
    width: 106,
    height: 106,
    borderRadius: 60,
    marginLeft: 25,
    alignContent: 'center',
    borderWidth: BORDER_WIDTH,
    borderColor: colors.imageBorder,
  },


  idHeader: {
    // backgroundColor: 'rgba(0,0,0,0.1)',
    height: 20,
    width: '100%',
    flexDirection: 'row',
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
    color: colors.subtle,
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
    aspectRatio: CREDIT_CARD_ASPECT_RATIO,
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
    paddingVertical: 0,
    paddingHorizontal: POCKET_CARD_SCREEN_MARGIN,
    // margin: 15,
    // backgroundColor: 'rgba(0,0,0,0.1)',
  },

  pocketListCardContainer: {
    // backgroundColor: 'rgba(0,0,0,0.1)',
    // aspectRatio: 1 / 1.618,
    width: Dimensions.get('window').width - 2 * POCKET_CARD_SCREEN_MARGIN,
    height: '100%',
    // marginTop: MARGIN,
    // paddingBottom: MARGIN,
    justifyContent: 'flex-start',
  },

  pocketListCard: {
    // aspectRatio: POCKET_CARD_ASPECT_RATIO,
    width: Dimensions.get('window').width - 2 * POCKET_CARD_SCREEN_MARGIN,
    flexGrow: 1,
    // marginRight: 15,
    marginBottom: 0,
    justifyContent: 'space-between',
  },

  pocketListName: {
    fontFamily: 'metropolis black italic',
    fontSize: 30,
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
    // aspectRatio: 1,
    flex: 7,
  },

  pocketListImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: CARD_RADIUS,
  },

  pocketSearchResultFlatList: {
    padding: MARGIN,
  },

  pocketSearchResultContainer: {
    marginVertical: MARGIN,
    marginHorizontal: MARGIN,
  },

  setting: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    paddingHorizontal: MARGIN,
  },

  settingIcon: {
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.medium,
  },

  settingIconContainer: {
    height: '100%',
    aspectRatio: 1,
    marginRight: MARGIN / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  settingText: {
    fontFamily: 'metropolis medium',
    fontSize: 18,
    color: colors.medium,
    // marginLeft: MARGIN,
  },

  settingEditText: {
    fontFamily: 'metropolis medium',
    fontSize: 18,
    lineHeight: 24,
    color: colors.medium,
    // marginLeft: MARGIN,
  },

  transactionListed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    marginHorizontal: MARGIN,
    marginVertical: MARGIN / 2,
  },

  transactionListedMerchantText: {
    fontFamily: 'metropolis medium',
    fontSize: 16,
    color: colors.dark,
    alignSelf: 'center',
  },

  transactionListedAmountText: {
    fontFamily: 'metropolis medium',
    fontSize: 16,
    color: colors.medium,
    alignSelf: 'center',
    marginRight: MARGIN / 2,
  },

  payConfirmationDetails: {
    fontFamily: 'metropolis bold',
    fontSize: 45,
    color: colors.transluscentWhite,
    textAlign: 'center',
  },

  payConfirmationDateTime: {
    fontFamily: 'metropolis bold',
    fontSize: 30,
    color: colors.transluscentWhite,
    textAlign: 'center',
  },

  payConfirmationBusiness: {
    fontFamily: 'metropolis black',
    fontSize: 60,
    color: colors.card,
    textAlign: 'center',
  },

  payConfirmationTotal: {
    fontFamily: 'metropolis black',
    fontSize: 75,
    color: colors.card,
    textAlign: 'center',
    marginTop: MARGIN,
  },

  logoText: {
    fontFamily: 'metropolis black italic',
    fontSize: 34,
    // lineHeight: 60,
    color: colors.gold,
    textAlign: 'center',
  },

  movingBannerText: {
    fontFamily: 'metropolis black italic',
    fontSize: 25,
    // lineHeight: 60,
    color: colors.transluscentWhite,
  },

  analyticsCard: {
    padding: MARGIN,
    fontFamily: 'metropolis regular',
  },

  analyticsHeaderContainer: {
    paddingBottom: 10,
    //width:'100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  analyticsTitle: {
    //flex:1,
    fontSize: 16,
    paddingBottom: 3,
    fontFamily: 'metropolis semibold',
    color: colors.dark,
  },

  analyticsRange: {
    //flex:1,
    fontSize: 12,
    fontFamily: 'metropolis black',
    color: colors.subtle,
  },

  analyticsContentContainer: {
    padding: 10
  },

  analyticsSectionHeaderContainer: {
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.bg,
    //borderTopWidth: 0,
    //borderBottomWidth: BORDER_WIDTH,
    // borderWidth: 0,
    //borderColor: colors.light,
  },
  analyticsSectionHeader: {
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    color: colors.subtle,
    fontFamily: 'metropolis regular',
  },

  analyticsNormalText: {
    fontFamily: 'metropolis medium',
    fontSize: 14,
    paddingBottom: 15,
  },

  analyticsMetricText: {
    fontFamily: 'metropolis bold',
    fontSize: 16,
  },

  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  }, 
  competitionTitle: {
    fontFamily: 'metropolis bold',
    fontSize: 20,
    color: colors.gold,
    textAlign: 'center',
  },

})