import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [String],
    validate: [arr => arr.length === 4, 'There must be exactly 4 options'],
    required: true
  },
  correctAnswer: { type: String, required: true }
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
