const mongoose = require('mongoose')

const mongoContestSchema = new mongoose.Schema({
    contestID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    contestName: { type: mongoose.Schema.Types.String },
    description: { type: mongoose.Schema.Types.String }, //
    winner: {type:mongoose.Schema.Types.String }, //
    status:{
      pending: { type:mongoose.Schema.Types.Boolean }, //if the contest has yet to be approved
      approved: { type:mongoose.Schema.Types.Boolean }, //if the contest has been approved & is active
      deactivated: { type:mongoose.Schema.Types.Boolean } //if the contest is still active
    },
})

const mongoContest = mongoose.model('mongoContest', mongoContestSchema)

module.exports = { mongoContest }
