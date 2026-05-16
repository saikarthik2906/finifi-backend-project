const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  documentType: {
    type: String,
    enum: ["po", "grn", "invoice"],
    required: true
  },

  poNumber: String,

  rawText: String,

  parsedData: Object,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Document", DocumentSchema);