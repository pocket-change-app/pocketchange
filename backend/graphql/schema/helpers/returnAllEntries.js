const R = require('ramda');
const {Op} = require('sequelize');

module.exports = async function returnAllEntries (
    { contestID, userID}, {Business, QRScan, Contest, Pocket, mongoContest}
) {
  try {
    //get the relevant info from mongo, ensuring SQL exists
    const contestInfo = await Contest.findOne({ where : {contestID: contestID}});
    const mongoContestInfo = await mongoContest.findOne({ contestID});
    //if the schemas return with relevant info for both mongo and SQl proceed
    if(contestInfo && mongoContestInfo){
        //subset by contest dates
        const startDate = contestInfo.startDate;
        const endDate = contestInfo.endDate;
        let filterEntries = []
        //only search within viable dates
        filterEntries.push({date: {
            [Op.between]: [startDate, endDate]
          }})
        //check to see if type is not null
        if (userID != null) {
            filterEntries.push({'userID': userID})
        }

        //takes an object returned by SQL query and adds contest ID to object value
        const addContestID = (obj, item) => {
            obj.forEach((key) => {
                key.contestID = contestID 
                key.contestID = contestID
            })
            return obj
        }
        
        //get all the businesses that are participating in a contest, need to inner join this by businessID with QRScans within date potentially by userID
        const allEntries = await Business.findAll({
            include:[{
                    model: Pocket, 
                    required: true,
                    include:[
                       {model: Contest, where: {'contestID': contestID}}
                    ]
                }
            ],
            required: true
        }).then(businesses = async(businesses) => {
            console.log("INSIDE")
            const businessIDs= businesses.map(business => business.businessID);
            console.log(businessIDs)
            filterEntries.push({businessID: {
                [Op.in]: businessIDs,
              },})
            const scans = await QRScan.findAll({ where: filterEntries, raw: true})
            console.log("SCANS", scans)
            const entries = addContestID(scans, contestID)
            return entries
          });
        return allEntries
    }
    else {
      throw new ApolloError(`contestID:${contestID} doesn't exist`);
      return {};
    }
  }
  catch (error) {
    console.log('returnAllEntries', error)
  }
}
