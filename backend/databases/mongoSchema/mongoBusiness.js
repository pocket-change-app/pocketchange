const mongoose = require('mongoose')

const mongoBusinessSchema = new mongoose.Schema({
    businessID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    businessName:  { type: mongoose.Schema.Types.String }, 
    dateEstablished: { type: mongoose.Schema.Types.Date },
    emailAddress: { type: mongoose.Schema.Types.String },
    phoneNumber: { type: mongoose.Schema.Types.String },
    website:  {type: mongoose.Schema.Types.String },
    businessType:  {type: mongoose.Schema.Types.String }, //restaurant, clothing
    businessSubtype:  {type: mongoose.Schema.Types.String },//cafe, kids clothing
    address: {type: mongoose.Schema.Types.Object },
    latitude:  {type: mongoose.Schema.Types.String },
    longitude:  {type: mongoose.Schema.Types.String },
    tags: {type: mongoose.Schema.Types.String }, //women-owned business, sustainable, etc.
    stripeID: {type: mongoose.Schema.Types.String }, //ID for stripe account
    description:{type: mongoose.Schema.Types.String}, //
    deactivated:{type:mongoose.Schema.Types.Boolean} //if the business is still active
  })
  
const mongoBusiness = mongoose.model('mongoBusiness', mongoBusinessSchema)

module.exports ={mongoBusiness}