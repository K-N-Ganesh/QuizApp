// models/Contestant.js
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  responses: {
    type: Map,
    of: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const contestantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  results: [resultSchema]
});

module.exports = mongoose.model("Contestant", contestantSchema);
