import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"));

app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

export default app;