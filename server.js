import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.routes.js";
dotenv.config();
//app config
const app = express();
const port = 5000;

//middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

//api endpoints
app.use("/api/v1/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Food Delivery Server is Working!!!");
});

app.listen(port, () => {
  console.log(`Server is running port: http://localhost:${port}`);
});

// mongodb+srv://<db_username>:<db_password>@cluster0.p11nzlu.mongodb.net/?
