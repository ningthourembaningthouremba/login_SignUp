import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
connectDB();

const FRONTEND_URL = process.env.NODE_ENV == "development" 
? ["http://localhost:5173"]
: [process.env.CLIENT_URL]
const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));


app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
