const { gql, ApolloError } = require('apollo-server');
const R = require('ramda')
const returnAllBusinesses = require('../helpers/returnAllBusinesses')

module.exports = {
    Query: {
        pocket: async (parent, { pocketID }, { Pocket, mongoPocket}) => {
            //check pocketID is not null
            if (pocketID == null) {
              return null;
            }
            //check mongo and SQL
            const pocketInfo = await Pocket.findOne({ where : {pocketID: pocketID}});
            const mongoPocketInfo = await mongoPocket.findOne({ pocketID })
            if(pocketInfo && mongoPocketInfo ){
              if(mongoPocketInfo.status.deactivated == false){
                return {
                  pocketID: pocketInfo.dataValues.pocketID,
                  circulatingChange: (parseFloat(pocketInfo.dataValues.circulatingChange).toFixed(2)),
                  changeRate: (parseFloat(pocketInfo.dataValues.changeRate).toFixed(2)),
                  region: mongoPocketInfo.region,
                  pocketName: mongoPocketInfo.pocketName,
                  status: mongoPocketInfo.status,
                  description:mongoPocketInfo.description
                }
              }
              else{
                throw new ApolloError(`pocketID:${pocketID} is no longer active`);
                return {};
              }
      
            }
            else {
              throw new ApolloError(`pocketID:${pocketID} doesn't exist`);
              return {};
            }
        },
        getAllPockets: async (parent, { userID }, { Pocket, mongoPocket, IsMember}) => {
          //make sure only getting active pockets
          let mongoPocketInfo = await mongoPocket.find({ 'status.deactivated': false}); 
          //if user specified filter all pockets
          //check if userID is not null
          if (userID != null) {
            //check the pocket-user relationship SQL table IsMember
            const isMemberInfo = await IsMember.findAll({where: {userID: userID}})
            //join two object arrays by matching pocketIDs
            const joinByPocketID = R.innerJoin(
              (a, b) => a.pocketID === b.pocketID
            )
            mongoPocketInfo = joinByPocketID(mongoPocketInfo, isMemberInfo)
          } 
          let pocketInfo
          let currMongoPocket
          const finalPocketInfo = []
          for(pocket in mongoPocketInfo){
            currMongoPocket = mongoPocketInfo[pocket]
            pocketInfo = await Pocket.findOne({where: {pocketID: currMongoPocket.pocketID}})
            finalPocketInfo.push({
              pocketID: currMongoPocket.pocketID,
              circulatingChange: (parseFloat(pocketInfo.dataValues.circulatingChange).toFixed(2)),
                  changeRate: (parseFloat(pocketInfo.dataValues.changeRate).toFixed(2)),
              region: currMongoPocket.region,
              pocketName: currMongoPocket.pocketName,
              status: currMongoPocket.status,
              description:currMongoPocket.description
            })
          }
          return finalPocketInfo
      },
      getBusinessPockets: async (parent, { businessID }, { mongoPocket, Pocket, mongoBusiness, IsIn, sequelizeConnection}) => {
        if (businessID == null) {
          return null;
        }        
        //get list of pocket business interactions
        const businessPockets = await IsIn.findAll({ 
            where: {businessID: businessID}
        })
        console.log(businessPockets)
        //make sure only getting active pockets
        let mongoPocketInfo = await mongoPocket.find({ 'status.deactivated': false});  
        console.log("mongoPocketInfo", mongoPocketInfo)
        const joinByPocketID = R.innerJoin(
          (a, b) => a.pocketID === b.pocketID
        )
        mongoPocketInfo = joinByPocketID(mongoPocketInfo, businessPockets)
        let pocketInfo
        let currMongoPocket
        const finalPocketInfo = []
        for(pocket in mongoPocketInfo){
          currMongoPocket = mongoPocketInfo[pocket]
          pocketInfo = await Pocket.findOne({where: {pocketID: currMongoPocket.pocketID}})
          finalPocketInfo.push({
            pocketID: currMongoPocket.pocketID,
            circulatingChange: (parseFloat(pocketInfo.dataValues.circulatingChange).toFixed(2)),
            changeRate: (parseFloat(pocketInfo.dataValues.changeRate).toFixed(2)),
            region: currMongoPocket.region,
            pocketName: currMongoPocket.pocketName,
            status: currMongoPocket.status,
            description:currMongoPocket.description
          })
        }
        return finalPocketInfo
      } 
    },
  
    Mutation: {
      createPocket: async (parent, { 
        userID,
        pocketName, 
        region,
        changeRate,
        managerID, 
        description
      }, { Pocket, mongoPocket, IsMember}) => {
          //check to see the pocket name they want isn't taken by another pocket
          const existing = await mongoPocket.findOne({ pocketName: pocketName })
          if (!existing) {
            //create a new pocket in Mongo and SQL
            const newPocketInfo = await Pocket.create({changeRate: (changeRate).toFixed(4),  circulatingChange: (0).toFixed(4),});
            const newMongoPocket = await mongoPocket.create({ 
              pocketID: newPocketInfo.pocketID, 
              pocketName: pocketName,
              region: region,
              status: {
                pending: true,
                approved: false,
                deactivated: false},
              description: description
            })
            //create the relationship where the user who made the pocket is the manager of the pocket if manager wasn't specified
            const manager = managerID? managerID: userID
            await IsMember.create({
              userID: manager,
              pocketID: newPocketInfo.pocketID,
              role: 'manager'
            })
            newMongoPocket.save()
            return {
              pocketID: newPocketInfo.dataValues.pocketID,
              circulatingChange: newPocketInfo.dataValues.circulatingChange,
              changeRate: newPocketInfo.dataValues.changeRate,
              region: newMongoPocket.region,
              pocketName: newMongoPocket.pocketName,
              status: newMongoPocket.status,
              description:newMongoPocket.description,
            }
          } else {
            throw new ApolloError('Pocket already exists')
          }
        },  
        updatePocket: async (parent, { 
          userID,
          pocketID,
          pocketName, 
          region,
          changeRate,
          description
        }, { Pocket, mongoPocket, IsMember, mongoUser}) => {
            //check to make sure the userID is the pocket manager 
          //check to make sure the userID is the pocket manager 
          const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
          if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
           //the user is the manager of this pocket, proceed (or its pocketchange admin)
              await mongoPocket.updateOne({ pocketID: pocketID },
                {
                  pocketName: pocketName == null ? mongoPocketInfo.pocketName : pocketName,
                  region: region == null ? mongoPocketInfo.region : region,
                  description: description == null ? mongoPocketInfo.description : description,
                })
              const mongoPocketInfo = await mongoPocket.findOne({ pocketID })
              let pocketInfo;
              if(changeRate !=null){
                //update the changeRate in SQL
                await Pocket.update(
                    {
                      changeRate: changeRate,
                    },
                    {
                      where: { pocketID: pocketID },
                    }
                  );
              }
              pocketInfo = Pocket.findOne(Pocket.findOne({where: { pocketID: pocketID }}))
              return {
                pocketID: pocketInfo.dataValues.pocketID,
                circulatingChange: pocketInfo.dataValues.circulatingChange,
                changeRate: pocketInfo.dataValues.changeRate,
                region: mongoPocketInfo.region,
                pocketName: mongoPocketInfo.pocketName,
                status: mongoPocketInfo.status,
                description: mongoPocketInfo.description,
              }
            }
            else {
              throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
            }
          },  
      deactivatePocket: async (parent, { 
        userID,
        pocketID
        }, { Pocket, mongoPocket,  IsMember, IsIn, mongoBusiness}) => {
           //check to make sure the userID is the pocket manager 
           const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
           if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
            //the user is the manager of this pocket, proceed (or its pocketchange admin)
            //deactivate the pocket
            //check to make sure all businessses are deactivated in the pocket first
            const businessList = await returnAllBusinesses({
              pocketID: pocketID
            },{IsIn, mongoBusiness}) 
            if(businessList.length ==0 ){
              await mongoPocket.updateOne({pocketID: pocketID}, {
                status: {
                  pending: false,
                  approved: false,
                  deactivated: true
                },
              });
              const mongoPocketInfo = await mongoPocket.findOne({pocketID: pocketID})  
              pocketInfo = Pocket.findOne(Pocket.findOne({where: { pocketID: pocketID }}))
              return {
                pocketID: pocketInfo.dataValues.pocketID,
                circulatingChange: pocketInfo.dataValues.circulatingChange,
                changeRate: pocketInfo.dataValues.changeRate,
                region: mongoPocketInfo.region,
                pocketName: mongoPocketInfo.pocketName,
                status: mongoPocketInfo.status,
                description: mongoPocketInfo.description
              }
            }
            else {
              throw new ApolloError('there are still active businesses in this pocket')
            }
          }
          else {
            throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
          }
        }, 
        approvePocket: async (parent, { 
          userID,
          pocketID
          }, { Pocket, mongoPocket,  IsMember, IsIn, mongoBusiness}) => {
             //check to make sure the userID is the pocket manager 
             const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
             if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
              //the user is the manager of this pocket, proceed (or its pocketchange admin)
              //deactivate the pocket
              //check to make sure all businessses are deactivated in the pocket first
              const businessList = await returnAllBusinesses({
                pocketID: pocketID
              },{IsIn, mongoBusiness}) 
              if(businessList.length ==0 ){
                await mongoPocket.updateOne({pocketID: pocketID}, {
                  status: {
                    pending: false,
                    approved: true,
                    deactivated: false
                  },
                });  
                const mongoPocketInfo = await mongoPocket.findOne({pocketID: pocketID}) 
                pocketInfo = Pocket.findOne(Pocket.findOne({where: { pocketID: pocketID }}))
                return {
                  pocketID: pocketInfo.dataValues.pocketID,
                  circulatingChange: pocketInfo.dataValues.circulatingChange,
                  changeRate: pocketInfo.dataValues.changeRate,
                  region: mongoPocketInfo.region,
                  pocketName: mongoPocketInfo.pocketName,
                  status: mongoPocketInfo.status,
                  description: mongoPocketInfo.description,
                }
              }
              else {
                throw new ApolloError('there are still active businesses in this pocket')
              }
            }
            else {
              throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
            }
          }, 
      joinPocketAsMember: async (parent, { 
          userID,
          pocketID
        }, { Pocket, mongoPocket, IsMember, ChangeBalance, mongoUser}) => {
          //check to make sure the userID is not already in the pocket
          const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
          if(isMemberInfo && isMemberInfo.dataValues.role == 'customer'){
            //user is already a member of this pocket, they can't join again
            throw new ApolloError('user is already member of this pocket')
          }
          //else the user can be added as a customer
          //set expiry date of the changebalance
          let currDate = new Date()
          let expiryDate = (currDate).setMonth((currDate).getMonth() + 6)
          console.log(expiryDate)
          //store expiry date in yyyy-mm-dd format
          expiryDate= new Date(expiryDate).toISOString().slice(0, 10)
          //initialize users change in this pocket as 0
          await ChangeBalance.create({
            pocketID: pocketID,
            userID: userID,
            value: (0.000).toFixed(4),
            expiryDate: expiryDate
          })
          //add them as member
          await IsMember.create({userID: userID, pocketID: pocketID, role: 'customer'})
          //get the pocket info to return
          const newMongoPocketJoined = await mongoPocket.findOne({pocketID:pocketID})
          const newPocketJoined = await Pocket.findOne({where:{pocketID:pocketID}})
          return {
            pocketID: newPocketJoined.dataValues.pocketID,
            circulatingChange: newPocketJoined.dataValues.circulatingChange,
            changeRate: newPocketJoined.dataValues.changeRate,
            region: newMongoPocketJoined.region,
            pocketName: newMongoPocketJoined.pocketName,
            status: newMongoPocketJoined.status,
            description: newMongoPocketJoined.description,
          }
        },
        joinPocketAsBusiness: async (parent, { 
          userID,
          businessID
        }, { Pocket, mongoPocket, IsIn}) => {
            //check to make sure the userID is the pocket manager 
            const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
            if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
              //check to make sure the business is not already in the pocket
              const isInInfo = await IsIn.findOne({ where:{ businessID:businessID, pocketID: pocketID}})
              if(isInInfo){
                //business is already a part of this pocket, they can't join again
                throw new ApolloError('business is already a part of this pocket')
              }
              //otherwise add them as IsIn
              await IsIn.create({businessID: businessID, pocketID: pocketID})
              //get the pocket info to return
              const newMongoPocketJoined = await mongoPocket.findOne({pocketID:pocketID})
              const newPocketJoined = await Pocket.findOne({where:{pocketID:pocketID}})
              return {
                pocketID: newPocketJoined.dataValues.pocketID,
                circulatingChange: newPocketJoined.dataValues.circulatingChange,
                changeRate: newPocketJoined.dataValues.changeRate,
                region: newMongoPocketJoined.region,
                pocketName: newMongoPocketJoined.pocketName,
                status: newMongoPocketJoined.status,
                description: newMongoPocketJoined.description,
              }
          }
          else{
            throw new ApolloError('this user is not the pocketmanager or pocketchange admin and cannot add a business')
          }
        
        }, 
        updatePocketManager: async (parent, { 
          userID,
          pocketID,
          managerID,
        }, { Pocket, mongoPocket, IsMember, WorksAt, mongoUser}) => {
          const isMemberInfo = await IsMember.findOne({ where:{ userID:userID, pocketID: pocketID}})
          if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
            //the user is the current manager or is pocketChange admin so they can update the pocket manager
            const IsMember = await IsMember.update(
              {
                userID: managerID,
                role: 'manager'
              },
              {
                where: { pocketID: pocketID, role: 'manager'},
              }
            )
            //get the pocket info to return
            const newMongoPocketJoined = await mongoPocket.findOne({pocketID:pocketID})
            const newPocketJoined = await Pocket.findOne({where:{pocketID:pocketID}})
            return {
              pocketID: newPocketJoined.dataValues.pocketID,
              circulatingChange: newPocketJoined.dataValues.circulatingChange,
              changeRate: newPocketJoined.dataValues.changeRate,
              region: newMongoPocketJoined.region,
              pocketName: newMongoPocketJoined.pocketName,
              status: newMongoPocketJoined.status,
              description: newMongoPocketJoined.description,
            }
          }
          else{
            throw new ApolloError('this user is not the pocketmanager or pocketchange admin and cannot change the manager')
          }
        },
        calculatePocketChange: async (parent, {pocketID }, { Pocket, Transaction, mongoPocket, sequelizeConnection}) => {
            //SELECT `pocketID`, SUM(`changeEarned`) AS `totalChangeEarned` FROM `transactions` AS `transaction` WHERE `transaction`.`pocketID` = '2p' GROUP BY `pocketID`;
            //console.log(pocketID)
            const changeEarnedPerPocket = await Transaction.findAll({ 
              attributes: ["pocketID", 
              [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeEarned')), 'totalChangeEarned']
              ],
              group: ["pocketID"],
              where: {pocketID: pocketID}
            })
            //if change is found in the pocket
            if (changeEarnedPerPocket[0]){
              const totalChangeEarned = changeEarnedPerPocket[0].dataValues.totalChangeEarned
              //onsole.log("change earned", totalChangeEarned)
              //SELECT `userID`, `pocketID`, SUM(`changeRedeemed`) AS `totalChangeRedeemed` FROM `transactions` AS `transaction` WHERE `transaction`.`userID` = '2c' AND `transaction`.`pocketID` = '2p' GROUP BY `userID`, `pocketID`;
              const changeRedeemedPerPocket = await Transaction.findAll({ 
                attributes: ["pocketID", 
                [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeRedeemed')), 'totalChangeRedeemed']
                ],
                group: ["pocketID"],
                where: {pocketID: pocketID}
              })
              let currentChange = totalChangeEarned
              if (changeRedeemedPerPocket[0]){
                const totalChangeRedeemed =  changeRedeemedPerPocket[0].dataValues.totalChangeRedeemed
                //console.log("change redeemed", totalChangeRedeemed)
                currentChange = totalChangeEarned - totalChangeRedeemed
              }
               //console.log("CUR CHANGE", currentChange)
                //update the Pocket circulating change
                const pocketChange = await Pocket.findOne({ where: {pocketID: pocketID}})
                const mongoPocketInfo = await mongoPocket.findOne({ pocketID })
                if (pocketChange && mongoPocketInfo){
                  await pocketChange.update({circulatingChange: currentChange})
                  return{
                    pocketID: pocketChange.dataValues.pocketID,
                    circulatingChange: (pocketChange.dataValues.circulatingChange).toFixed(2),
                    changeRate: pocketChange.dataValues.changeRate,
                    region: mongoPocketInfo.region,
                    pocketName: mongoPocketInfo.pocketName,
                    status: mongoPocketInfo.status,
                    description: mongoPocketInfo.description,
                  }
                }
              }
              else {
                throw new ApolloError(`no change in this pocketID:${pocketID}` );
              }
            } 
        },
  }