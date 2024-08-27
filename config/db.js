import mongoose from "mongoose";
// atlas database
// const url = `mongodb+srv://${process.env.DB__USER}:${process.env.DB__PASS}@cluster0.p11nzlu.mongodb.net/food__delivery__second`;
const url = "mongodb://localhost:27017/food__delivery__second";
// local database

export const connectDB = async () => {
  await mongoose.connect(url).then(() => {
    console.log("DB Connected");
  });
};
