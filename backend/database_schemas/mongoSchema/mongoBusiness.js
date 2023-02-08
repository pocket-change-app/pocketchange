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
    hours: {
        "Monday":[{
            start: {
              type: mongoose.Schema.Types.Number, //number is of 0-1440 for the number of minutes in a day
              validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
              } 
            }, 
            end:{
              type: mongoose.Schema.Types.Number, 
              validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
              } 
            },  
        }],//-> list of start and end times for open hours of  operation time for Monday
        "Tuesday": [{
          start: {
            type: mongoose.Schema.Types.Number, //number is of 0-1440 for the number of minutes in a day
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          }, 
          end:{
            type: mongoose.Schema.Types.Number, 
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          },  
        }],//-> list of start and end times for open hours of operation time for Tuesday
        "Wednesday": [{
          start: {
            type: mongoose.Schema.Types.Number, //number is of 0-1440 for the number of minutes in a day
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          }, 
          end:{
            type: mongoose.Schema.Types.Number, 
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          },  
        }],//-> list of start and end times for open hours of operation Wednesday
        "Thursday": [{
          start: {
            type: mongoose.Schema.Types.Number, //number is of 0-1440 for the number of minutes in a day
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          }, 
          end:{
            type: mongoose.Schema.Types.Number, 
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          },  
          }],//-> list of start and end times for open hours of operation Thursday
        "Friday": [{
          start: {
            type: mongoose.Schema.Types.Number, //number is of 0-1440 for the number of minutes in a day
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          }, 
          end:{
            type: mongoose.Schema.Types.Number, 
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          },  
        }],//-> list of start and end times for open hours of operation Friday
        "Saturday": [{
          start: {
            type: mongoose.Schema.Types.Number, //number is of 0-1440 for the number of minutes in a day
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          }, 
          end:{
            type: mongoose.Schema.Types.Number, 
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          },  
        }],//-> list of start and end times for open hours of operation Saturday
        "Sunday": [{
          start: {
            type: mongoose.Schema.Types.Number, //number is of 0-1440 for the number of minutes in a day
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          }, 
          end:{
            type: mongoose.Schema.Types.Number, 
            validate : {
              validator : Number.isInteger,
              message   : '{VALUE} is not an integer value'
            } 
          },  
        }],//-> list of start and end times for open hours of operation Sunday
      },
    status:{
        pending: {type:mongoose.Schema.Types.Boolean}, //if the business has yet to be approved
        approved: {type:mongoose.Schema.Types.Boolean}, //if the business has been approved & is active
        deactivated: {type:mongoose.Schema.Types.Boolean} //if the business is still active
    },
  })
  
const mongoBusiness = mongoose.model('mongoBusiness', mongoBusinessSchema)

module.exports ={mongoBusiness}