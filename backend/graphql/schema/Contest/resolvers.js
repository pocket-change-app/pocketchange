const { gql, ApolloError } = require('apollo-server');
const R = require('ramda')
const math = require('mathjs')
const {Op} = require('sequelize')
const returnAllEntries = require('../helpers/returnAllEntries')

                                                                                                                                                                                                                                                                                                       
module.exports = {
  Query: {
    contest: async (parent, { contestID }, { Contest, mongoContest}) => {
      //check to make sure nonempty contestID was given
        if (contestID === '') {
          return null;
        }
        //get the relevant info from mongo, ensuring SQL exists
        const contestInfo = await Contest.findOne({ where : {contestID: contestID}});
        const mongoContestInfo = await mongoContest.findOne({ contestID});
        //if the schemas return with relevant info for both mongo and SQl proceed
        if(contestInfo && mongoContestInfo){
            if(mongoContestInfo.status.deactivated == false){
            //subset fields needed
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
              winners: mongoContestInfo.winners, 
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
    getAllEntries: async (parent, { contestID, userID }, { Contest, mongoContest, QRScan, Business, Pocket}) => {
      const allEntriesInfo = await returnAllEntries({
        contestID: contestID, userID: userID
      },{Business, QRScan, Contest, mongoContest, Pocket}) 
      return allEntriesInfo
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
          //create a new contest in Mongo and SQL
          const newContest = await Contest.create({
            pocketID: pocketID,
            prizeValue: prizeValue,
            startDate: startDate,
            endDate: endDate,
        });
          const newMongoContest = await mongoContest.create({ 
            contestID: newContest.contestID, 
            contestName: contestName,
            description: description,
            winners: null,
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
            contestName: newMongoContest.contestName, 
            description: newMongoContest.description, 
            winners: newMongoContest.winners, 
            status:newMongoContest.status, 
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
            winners: mongoContestInfo.winners, 
            status:mongoContestInfo.status, 
          }
        }
        else {
          throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
        }
    },   
    chooseWinningEntries: async (parent, { 
      userID,
      contestID,
      winnerNumber,
    }, { Contest, mongoContest, Business, IsMember, QRScan, Pocket, ParticipatingIn, mongoUser}) => {
        const pocketInfo = await ParticipatingIn.findOne({where:{contestID: contestID}, raw: true})
        const pocketID = pocketInfo.pocketID
        const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
        if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
        //the user is the current manager or is pocketChange admin so they can select the contest winner
          //the user is the manger of the pocket proceed (or its pocketchange admin)
          //get all entries, do not pass userID
          const allEntriesInfo = await returnAllEntries({
            contestID: contestID,
          },{Business, QRScan, Contest, mongoContest, Pocket}) 
          // shuffle entry info
          const shuffledEntries = allEntriesInfo.sort(() => 0.5 - Math.random());

          // get sub-array of first n elements after shuffled
          const winningEntries = shuffledEntries.slice(0, winnerNumber);
          console.log(winningEntries)
          const winningUserIDs= winningEntries.map(entry => entry.userID);
          console.log(winningUserIDs)
          const mongoContestInfo = await mongoContest.updateOne({ contestID: contestID },
            {
              winners: winningUserIDs
            })
          return winningEntries
          //return winning entries
        }
        else {
          throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
        }
    }, 
    editContest: async (parent, { 
      userID,
      pocketID, 
      contestID,
      contestName,
      description,
    }, { Contest, mongoContest, IsIn, WorksAt}) => {
        const pocketInfo = await ParticipatingIn.findOne({where:{contestID: contestID}, raw: true})
        const pocketID = pocketInfo.pocketID
        const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
        if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
        //the user is the current manager or is pocketChange admin so they can edit the contest
        const mongoContestInfo = await mongoContest.findOne({ contestID: contestID })
        await mongoContest.updateOne({ contestID: contestID },
          {
            contestName: contestName? contestName : mongoContestInfo.contestName,
            description: description? description : mongoContestInfo.description,
          })
        await mongoContestInfo.save()
        return mongoContestInfo
        } else {
          throw new ApolloError('User does not have permission to edit this contest')
        }
    },   
  }
}