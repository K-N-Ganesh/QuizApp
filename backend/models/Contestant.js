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


const contestantSchema = new mongoose.Schema(
  {
    usn: {
      type: String,
      required: true,
      unique: true, // ensures each student USN is unique
      trim: true,
      uppercase: true // auto-converts '4nm21mca01' → '4NM21MCA01'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    className: {
      type: String,
      required: true,
      enum: ["BCA-I", "BCA-II", "BCA-III"], // helps maintain data consistency
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "contestants"
  }
);



module.exports = mongoose.model("Contestant", contestantSchema);
