import validator from "validator";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createToken } from "../authenticaiton/authentication.user.js";
const loginUser = async (req, res) => {
  console.log("routes is working: User controller");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking user exist of not with this email
    const existendUser = await userModel.findOne({ email: email });
    if (existendUser) {
      return res.status(404).json({
        success: false,
        message: "User already exist with this email.",
      });
    }

    // validate gmail
    if (!validator.isEmail(email)) {
      return res.status(404).json({
        success: false,
        message: "Please enter a valid email.",
      });
    }
    // validate password
    if (password.length < 8) {
      return res.status(404).json({
        success: false,
        message: "Password must be at least 8 character",
      });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const result = await user.save();
    if (result._id) {
      const token = await createToken(result._id, result.email);
      res.status(200).json({
        success: true,
        message: "Your Account Created Succussfully.",
        authtoken: token,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Something went wrong!" });
  }
};

export { loginUser, registerUser };
