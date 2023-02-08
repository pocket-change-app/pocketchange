const mongoose = require('mongoose')

const mongoPocketSchema = new mongoose.Schema({
    pocketID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    pocketName: { type: mongoose.Schema.Types.String },
    region: { type: mongoose.Schema.Types.String }, //Toronto for now
    description:{ type: mongoose.Schema.Types.String }, //
    status:{
      pending: { type:mongoose.Schema.Types.Boolean }, //if the pocket has yet to be approved
      approved: { type:mongoose.Schema.Types.Boolean }, //if the pocket has been approved & is active
      deactivated: { type:mongoose.Schema.Types.Boolean } //if the pocket is still active
  },
    //georegion?
  })
  
  const mongoPocket = mongoose.model('mongoPocket', mongoPocketSchema)

  module.exports ={mongoPocket}
