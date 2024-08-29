import jwt from "jsonwebtoken";

export const createToken = (id, email) => {
  const token = jwt.sign(
    { userId: id, email: email },
    process.env.JWT__SECRET,
    { expiresIn: "7d" }
  );
  return token;
};
