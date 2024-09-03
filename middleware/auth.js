import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  try {
    const { authtoken } = req.headers;
    const token = authtoken.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT__SECRET);
    req.body.userId = decodeToken.userId;
    req.body.email = decodeToken.email;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
};

export default authMiddleware;
