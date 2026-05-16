const mongoose = require("mongoose");

const MatchResultSchema = new mongoose.Schema({
  poNumber: String,

  status: String,

  reasons: [String],

  documents: {
    po: Object,
    grns: [Object],
    invoices: [Object]
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MatchResult", MatchResultSchema);