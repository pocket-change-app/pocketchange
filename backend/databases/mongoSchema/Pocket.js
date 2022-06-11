const mongoose = require('mongoose')

const pocketSchema = new mongoose.Schema({
    pocketID: { type: mongoose.Schema.Types.ObjectId }, // no auto since generated in SQL
    pocketname: { type: mongoose.Schema.Types.String },
    businesses: [mongoose.Schema.Types.ObjectId],
    customers: [mongoose.Schema.Types.ObjectId]
    //georegion?
  })
  
  const pocket = mongoose.model('Pocket', pocketSchema)

  module.exports ={pocket}
