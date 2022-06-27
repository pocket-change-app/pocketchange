const mongoose = require('mongoose')

const mongoPocketSchema = new mongoose.Schema({
    pocketID: { type: mongoose.Schema.Types.ObjectId }, // no auto since generated in SQL
    pocketname: { type: mongoose.Schema.Types.String },
    businesses: [mongoose.Schema.Types.ObjectId],
    customers: [mongoose.Schema.Types.ObjectId]
    //georegion?
  })
  
  const mongoPocket = mongoose.model('mongoPocket', mongoPocketSchema)

  module.exports ={mongoPocket}
