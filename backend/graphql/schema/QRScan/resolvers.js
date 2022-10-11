const { gql, ApolloError } = require('apollo-server');
const R = require('ramda')
const math = require('mathjs')
const {Op} = require('sequelize');
const { mongoBusiness } = require('../../../databases/mongoSchema/mongodb');

                                                                                                                                                                                                                                                                                                       
module.exports = {
  Query: {
    QRScan: async (parent, { QRScanID }, { QRScan}) => {
      //check to make sure nonempty QRScan was given
        if (QRScanID === '') {
          return null;
        }
        console.log(QRScan, QRScanID)
        //get the relevant info
        const QRScanInfo = await QRScan.findOne({ where : {QRScanID: QRScanID}});
        if(QRScanInfo){
            return {
              //return    QRScanID, userID, businessID, geolocationID, date
              QRScanID: QRScanInfo.dataValues.QRScanID,
              userID: QRScanInfo.dataValues.userID,
              businessID: QRScanInfo.dataValues.businessID,
              geolocationID: QRScanInfo.dataValues.geolocationID,
              date: QRScanInfo.dataValues.date,
            }
          }
          else {
            throw new ApolloError(`This QRScan:${QRScan} does not exist`);
            return {};
          }
    },
  },

  Mutation: {
    processQRScan: async (parent, { 
      userID,
      businessID,
      latitude,
      longitude,
    }, { QRScan, Geolocation, mongoBusiness}) => {
        //create date
        const date = new Date()
        //create geolocation
        const currGeo = await Geolocation.create({userID: userID, latitude: latitude, longitude:longitude, timestamp: date})
        //check to make sure current geolocation is close to businesses
        const currBusiness = await mongoBusiness.findOne({businessID: businessID})
        //check to make sure the distance between the business and the coordinates entered is less than the radius of 0.01
        const businessLat = currBusiness.latitude
        const businessLong = currBusiness.longitude

        const node1 = math.parse('math.abs(math.subtract((businessLat), latitude)) <= radius')
        const node2 = math.parse('math.abs(math.subtract((businessLong), longitude)) <= radius')
        const code1 = node1.compile()
        const code2 = node2.compile()
        let scope = {
            math: math,
            businessLat: businessLat,
            latitude: latitude,
            radius: 0.01,
            longitude:longitude,
            businessLong: businessLong,
        }
        const nearbyLat = (code1.evaluate(scope))
        const nearbyLong = (code2.evaluate(scope))

        const node3 = math.parse('nearbyLat and nearbyLong')
        const code3 = node3.compile()
        let scope2 = {
            nearbyLat: nearbyLat,
            nearbyLong: nearbyLong
        }
        const nearbyLatAndLong = (code3.evaluate(scope2))
        if(nearbyLatAndLong){
            const newQRScan = await QRScan.create({ 
                geolocationID: currGeo.geolocationID, 
                userID: userID,
                businessID: businessID,
                date: date,
            })
            newQRScan.save()
            return {
                //return    QRScanID, userID, businessID, geolocationID, date
                QRScanID: newQRScan.dataValues.QRScanID,
                userID: newQRScan.dataValues.userID,
                businessID: newQRScan.dataValues.businessID,
                geolocationID: newQRScan.dataValues.geolocationID,
                date: newQRScan.dataValues.date,
              }
        }
        else {
            throw new ApolloError(`You are not near business:${businessID}`);
            return {};
          }
        
    },   
  }
}