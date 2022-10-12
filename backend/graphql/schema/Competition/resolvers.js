const { gql, ApolloError } = require('apollo-server');
const R = require('ramda')
const math = require('mathjs')
const {Op} = require('sequelize')

                                                                                                                                                                                                                                                                                                       
module.exports = {
  Query: {
    competition: async (parent, { competitionID }, { Competition, mongoCompetition}) => {
      //check to make sure nonempty businessID was given
        if (competitionID === '') {
          return null;
        }
        //get the relevant business info from mongo, ensuring SQL exists
        const competitionInfo = await Competition.findOne({ where : {competitionID: competitionID}});
        const mongoCompetitionInfo = await mongoCompetition.findOne({ competitionID});
        //if the schemas return with relevant info for both mongo and SQl proceed
        if(competitionInfo && mongoCompetitionInfo){
            if(mongoCompetitionInfo.status.deactivated == false){
            //subset fields needed which are businessID, businessName, 
            //dateEstablished, emailAddress, phoneNumber, website, businessType,businessSubtype
            return {
              //return values described for business
              competitionID: mongoCompetitionInfo.competitionID, 
              pocketID: competitionInfo.dataValues.pocketID,
              prizeValue: competitionInfo.dataValues.prizeValue,
              startDate: competitionInfo.dataValues.startDate,
              endDate: competitionInfo.dataValues.endDate,
              competitionName: mongoCompetitionInfo.competitionName, 
              description: mongoCompetitionInfo.description, 
              winner: mongoCompetitionInfo.winner, 
              status:mongoCompetitionInfo.status, 
            }
          }
          else {
            throw new ApolloError(`This competitionID:${competitionID} no longer exists`);
            return {};
          }
        }
        else {
          throw new ApolloError(`competitionID:${competitionID} doesn't exist`);
          return {};
        }
    },
  },

  Mutation: {
    createCompetition: async (parent, { 
      userID,
      pocketID, 
      prizeValue,
      startDate,
      endDate,
      competitionName,
      description,
    }, { Competition, mongoCompetition, IsIn, WorksAt}) => {
        //check to see the business name they want isn't taken by another business
        const existing = await mongoCompetition.findOne({ competitionName: competitionName })
        if (!existing) {
          //create a new competition in Mongo and SQL
          const newComp = await Competition.create({
            pocketID: pocketID,
            prizeValue: prizeValue,
            startDate: startDate,
            endDate: endDate,
        });
          const newMongoComp = await mongoCompetition.create({ 
            competitionID: newComp.competitionID, 
            competitionName: competitionName,
            description: description,
            winner: null,
            status: {
              pending: true,
              approved: false,
              deactivated: false,
            },
          })
          newMongoComp.save()
          return {
            competitionID: newComp.competitionID, 
            pocketID: newComp.dataValues.pocketID,
            prizeValue: newComp.dataValues.prizeValue,
            startDate: newComp.dataValues.startDate,
            endDate: newComp.dataValues.endDate,
            competitionName: newMongoComp.competitionName, 
            description: newMongoComp.description, 
            winner: newMongoComp.winner, 
            status:newMongoComp.status, 
          }
        } else {
          throw new ApolloError('Competition already exists')
        }
    },  
    deactivateCompetition: async (parent, { 
      userID,
      competitionID,
      pocketID,
    }, { Competition, mongoCompetition, IsMember, WorksAt, mongoUser}) => {
        const isMemberInfo = await IsMember.findOne({ where:{ userID: userID, pocketID: pocketID}})
        if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
        //the user is the current manager or is pocketChange admin so they can update the comp
          //the user is the manger of the pocket proceed (or its pocketchange admin)
          //deactivate the comp
          await mongoCompetition.updateOne({ competitionID: competitionID },
            {
              status: {
                pending: false,
                approved: false,
                deactivated: true
              },
            })
          const mongoCompetitionInfo = await mongoCompetition.findOne({ competitionID: competitionID })
          console.log(mongoCompetitionInfo)
          return(mongoCompetitionInfo)
        }
        else {
          throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
        }
    },  
    approveCompetition: async (parent, { 
      userID,
      competitionID,
      pocketID,
    }, { Competition, mongoCompetition, IsMember, mongoUser}) => {
        const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
        if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
        //the user is the current manager or is pocketChange admin so they can update the comp
          //the user is the manger of the pocket proceed (or its pocketchange admin)
          //approve the comp
          await mongoCompetition.updateOne({ competitionID: competitionID },
            {
              status: {
                pending: false,
                approved: true,
                deactivated: false
              },
            })
          const mongoCompetitionInfo = await mongoCompetition.findOne({ competitionID: competitionID })
          const competitionInfo = await Competition.findOne({where:{ competitionID: competitionID }})
          console.log(mongoCompetitionInfo)
          return {
            //return values described for business
            competitionID: mongoCompetitionInfo.competitionID, 
            pocketID: competitionInfo.dataValues.pocketID,
            prizeValue: competitionInfo.dataValues.prizeValue,
            startDate: competitionInfo.dataValues.startDate,
            endDate: competitionInfo.dataValues.endDate,
            competitionName: mongoCompetitionInfo.competitionName, 
            description: mongoCompetitionInfo.description, 
            winner: mongoCompetitionInfo.winner, 
            status:mongoCompetitionInfo.status, 
          }
        }
        else {
          throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
        }
    },  
  }
}