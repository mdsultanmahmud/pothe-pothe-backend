import foodModel from "../models/food.model.js";
import fs from "fs";
// get all foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (foods.length > 0) {
      res.status(200).json({ success: true, data: foods });
    } else if (foods.length <= 0) {
      res
        .status(200)
        .json({ success: true, message: "There is no food in database." });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Something Went Wrong." });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, message: "Something Went Wrong." });
  }
};

//add food
const addFood = async (req, res) => {
  try {
    const file_name = `${req.file.filename}`;
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: file_name,
    });

    const result = await food.save();
    if (result) {
      res
        .status(200)
        .json({ success: true, message: "Food Added in Database." });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Something Went Wrong." });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, message: "Something Went Wrong." });
  }
};

const deleteOneFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }
    fs.unlink(`uploads/${food.image}`, () => {});
    const result = await foodModel.findByIdAndDelete(req.params.id);
    if (result) {
      res
        .status(200)
        .json({
          success: true,
          message: `${result.name} Deleted from Database.`,
        });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Something Went Wrong." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Went Wrong." });
  }
};

export { addFood, getAllFoods, deleteOneFood };
