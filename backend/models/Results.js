import { Schema, model } from "mongoose";

const resultSchema = new Schema({
  name: String,
  responses: Object,
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

export default model("Result", resultSchema);
