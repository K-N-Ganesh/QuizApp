import express, { json } from "express";
import  "mongoose";
import cors from "cors";
import { config } from "dotenv";
import mongoose from 'mongoose';

config();

const app = express();
app.use(cors());
app.use(json());

// Routes
import router from "./routes/quiz.js";
app.use("/api/quiz", router);

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
    
    // Start the server only after successful connection to MongoDB
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.error('MongoDB connection error:', err));