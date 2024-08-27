import express from "express";
import {
  addFood,
  deleteOneFood,
  getAllFoods,
} from "../controllers/food.controller.js";
import upload from "../multer/multer.js";
const router = express.Router();

router.post("/add", upload.single("image"), addFood);
router.get("/", getAllFoods);
router.delete("/delete/:id", deleteOneFood);
export default router;
