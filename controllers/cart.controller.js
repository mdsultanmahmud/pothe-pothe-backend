import userModel from "../models/user.model.js";

// add foods into cart
const addToCartController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = await user?.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    const result = await userModel.findByIdAndUpdate(req.body.userId, {
      cartData,
    });
    if (result) {
      res.status(200).json({ success: true, message: "Item added into cart!" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Item is not added into cart!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
};

// remove items from cart
const removeFromCartController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = await user.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    const result = await userModel.findByIdAndUpdate(req.body.userId, {
      cartData,
    });
    if (result) {
      res
        .status(200)
        .json({ success: true, message: "Item removed from cart!" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Item is not remove from cart!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
};
// get cart items
const getCartItemsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = await user.cartData;
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
};

export {
  addToCartController,
  removeFromCartController,
  getCartItemsController,
};
