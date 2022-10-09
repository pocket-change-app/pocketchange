const mongoose = require('mongoose')

const mongoCompetitionSchema = new mongoose.Schema({
    competitionID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    competitionName: { type: mongoose.Schema.Types.String },
    description: { type: mongoose.Schema.Types.String }, //
    status:{
      pending: { type:mongoose.Schema.Types.Boolean }, //if the competition has yet to be approved
      approved: { type:mongoose.Schema.Types.Boolean }, //if the competition has been approved & is active
      deactivated: { type:mongoose.Schema.Types.Boolean } //if the competition is still active
    },
})

const mongoCompetition = mongoose.model('mongoCompetition', mongoCompetitionSchema)

module.exports = { mongoCompetition }
