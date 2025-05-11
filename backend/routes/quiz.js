import { Router } from "express";
const router = Router();
import mongoose from "mongoose";
import contestent from "../models/Contestant.js";

const correctAnswers = {
  q1: "4",
  q2: "Paris"
};

router.post('/contestant', async (req, res) => {
  const { usn, name } = req.body;

  try {
    const contestant = new contestent({ usn, name });
    await contestant.save();
    res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});
router.post("/question", async (req, res) => {
  try {
    const { questionText, options, correctAnswer } = req.body;

    if (!questionText || !Array.isArray(options) || options.length !== 4 || !correctAnswer) {
      return res.status(400).json({ message: "Invalid data. Provide questionText, 4 options, and correctAnswer." });
    }

    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ message: "Correct answer must be one of the options." });
    }

    const question = new Question({ question:questionText, options, correctAnswer });
    await question.save();

    res.status(201).json({ message: "Question added successfully", question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name , usn , responses } = req.body;
    let score = 0;

    const contestant1 = await Contestant.findOne({ usn: usn.trim() });
    if (!contestant1) {
        console.log("eror",usn,responses);
      return res.status(400).json({ status: "error", message: "Contestant not found" });
    }

    const questionIds = Object.keys(responses).map(id => new mongoose.Types.ObjectId(id));
    const questions = await Question.find({ _id: { $in: questionIds } });

    questions.forEach((question) => {
      const qid = question._id.toString();
      if (responses[qid] === question.correctAnswer) {
        score++;
      }
    });

    contestant1.results.push({
      responses,
      score
    });

    await contestant1.save();

    res.json({ status: "success", score });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});
// routes/quiz.js (add this route)
import Question from "../models/Question.js";
import Contestant from "../models/Contestant.js";


  router.get("/random", async (req, res) => {
  try {
    const { usn } = req.query;

    if (!usn) {
      return res.status(400).json({ error: "USN is required" });
    }

    const contestant = await Contestant.findOne({ usn: usn.trim() });

    if (!contestant) {
      return res.status(404).json({ error: "Contestant not found" });
    }

    // Check if quiz was already attempted
    if (contestant.results && contestant.results.length > 0) {
      return res.status(403).json({ error: "Quiz already attempted" });
    }

    // Send random questions
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
    res.json(questions);

  } catch (err) {
    console.error("Error fetching quiz questions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

export default router;
