import { visitWithTypeInfo } from 'graphql';
import { StyleSheet } from 'react-native';
import { colors } from './constants/Colors';

export const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
  },

  card: {
    //flex: 1,
    marginBottom: 15,
    backgroundColor: colors.card,
    borderColor: colors.light,
    borderWidth: 2,
    borderRadius: 10,
    // padding: 15,
  },

  transparentCard: {
    //flex: 1,
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    //padding: 15,
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
    padding: 15,
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
    padding: 15,
  },

  businessHeaderImageContainer: {
    width: '100%',
    height: 125,

  },

  businessHeaderImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,

  },

  businessModalInfo: {
    margin: 15,
  },

  businessListInfo: {
    justifyContent: 'center',
    margin: 15,
  },

  payButton: {
    borderRadius: 10,
    marginTop: 15,
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
    padding: 15,
  },

  idHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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


})