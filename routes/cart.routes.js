import express from "express";
import {
  addToCartController,
  getCartItemsController,
  removeFromCartController,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();
router.get("/", authMiddleware, getCartItemsController);
router.post("/add-cart", authMiddleware, addToCartController);
router.delete("/remove-cart", authMiddleware, removeFromCartController);

export default router;
