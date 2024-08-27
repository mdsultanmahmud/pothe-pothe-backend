import mongoose, { model, Schema } from "mongoose";
const foodSchema = new Schema({
  name: {
    type: String,
    requred: true,
  },
  description: {
    type: String,
    requred: true,
  },
  price: {
    type: Number,
    requred: true,
  },
  image: {
    type: String,
    requred: true,
  },
  category: {
    type: String,
    requred: true,
  },
});

const foodModel = model.food || model("food", foodSchema);
export default foodModel;
