import express, { json } from "express";
import  "mongoose";
import cors from "cors";
import { config } from "dotenv";
import mongoose from 'mongoose';

config();
const allowedOrigins = [
  "https://daaquiz.netlify.app",   // your frontend
    
];

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
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