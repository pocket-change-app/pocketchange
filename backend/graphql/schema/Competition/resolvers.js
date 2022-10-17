const { gql, ApolloError } = require('apollo-server');
const R = require('ramda')
const math = require('mathjs')
const {Op} = require('sequelize')

                                                                                                                                                                                                                                                                                                       
module.exports = {
  Query: {
    contest: async (parent, { contestID }, { Contest, mongoContest}) => {
      //check to make sure nonempty businessID was given
        if (contestID === '') {
          return null;
        }
        //get the relevant business info from mongo, ensuring SQL exists
        const contestInfo = await Contest.findOne({ where : {contestID: contestID}});
        const mongoContestInfo = await mongoContest.findOne({ contestID});
        //if the schemas return with relevant info for both mongo and SQl proceed
        if(contestInfo && mongoContestInfo){
            if(mongoContestInfo.status.deactivated == false){
            //subset fields needed which are businessID, businessName, 
            //dateEstablished, emailAddress, phoneNumber, website, businessType,businessSubtype
            return {
              //return values described for business
              contestID: mongoContestInfo.contestID, 
              pocketID: contestInfo.dataValues.pocketID,
              prizeValue: contestInfo.dataValues.prizeValue,
              startDate: contestInfo.dataValues.startDate,
              endDate: contestInfo.dataValues.endDate,
              contestName: mongoContestInfo.contestName, 
              description: mongoContestInfo.description, 
              winner: mongoContestInfo.winner, 
              status:mongoContestInfo.status, 
            }
          }
          else {
            throw new ApolloError(`This contestID:${contestID} no longer exists`);
            return {};
          }
        }
        else {
          throw new ApolloError(`contestID:${contestID} doesn't exist`);
          return {};
        }
    },
  },

  Mutation: {
    createContest: async (parent, { 
      userID,
      pocketID, 
      prizeValue,
      startDate,
      endDate,
      contestName,
      description,
    }, { Contest, mongoContest, IsIn, WorksAt}) => {
        //check to see the business name they want isn't taken by another business
        const existing = await mongoContest.findOne({ contestName: contestName })
        if (!existing) {
          //create a new contest in Mongo and SQL
          const newContest = await Contest.create({
            pocketID: pocketID,
            prizeValue: prizeValue,
            startDate: startDate,
            endDate: endDate,
        });
          const newMongoContest = await mongoContest.create({ 
            contestID: newComp.contestID, 
            contestName: contestName,
            description: description,
            winner: null,
            status: {
              pending: true,
              approved: false,
              deactivated: false,
            },
          })
          newMongoContest.save()
          return {
            contestID: newContest.contestID, 
            pocketID: newContest.dataValues.pocketID,
            prizeValue: newContest.dataValues.prizeValue,
            startDate: newContest.dataValues.startDate,
            endDate: newContest.dataValues.endDate,
            contestID: newMongoContest.contestName, 
            description: newMongoContest.description, 
            winner: newMongoContest.winner, 
            status:newMongoContest.status, 
          }
        } else {
          throw new ApolloError('Contest already exists')
        }
    },  
    deactivateContest: async (parent, { 
      userID,
      contestID,
      pocketID,
    }, { Contest, mongoContest, IsMember, WorksAt, mongoUser}) => {
        const isMemberInfo = await IsMember.findOne({ where:{ userID: userID, pocketID: pocketID}})
        if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
        //the user is the current manager or is pocketChange admin so they can update the contest
          //the user is the manger of the pocket proceed (or its pocketchange admin)
          //deactivate the contest
          await mongoContest.updateOne({ contestID: contestID },
            {
              status: {
                pending: false,
                approved: false,
                deactivated: true
              },
            })
          const mongoContestInfo = await mongoContest.findOne({ contestID: contestID })
          console.log(mongoContestInfo)
          return(mongoContestInfo)
        }
        else {
          throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
        }
    },  
    approveContest: async (parent, { 
      userID,
      contestID,
      pocketID,
    }, { Contest, mongoContest, IsMember, mongoUser}) => {
        const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
        if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
        //the user is the current manager or is pocketChange admin so they can update the contest
          //the user is the manger of the pocket proceed (or its pocketchange admin)
          //approve the contest
          await mongoContest.updateOne({ contestID: contestID },
            {
              status: {
                pending: false,
                approved: true,
                deactivated: false
              },
            })
          const mongoContestInfo = await mongoContest.findOne({ contestID: contestID })
          const contestInfo = await Contest.findOne({where:{ contestID: contestID }})
          console.log(mongoContestInfo)
          return {
            //return values described for contest
            contestID: mongoContestInfo.contestID, 
            pocketID: contestInfo.dataValues.pocketID,
            prizeValue: contestInfo.dataValues.prizeValue,
            startDate: contestInfo.dataValues.startDate,
            endDate: contestInfo.dataValues.endDate,
            contestName: mongoContestInfo.contestName, 
            description: mongoContestInfo.description, 
            winner: mongoContestInfo.winner, 
            status:mongoContestInfo.status, 
          }
        }
        else {
          throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
        }
    },  
  }
}