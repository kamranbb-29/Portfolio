import mongoose from "mongoose";

const connectDB = async () => {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    throw new Error("uri not defined");
  }
  await mongoose.connect(URI);
  console.log("connected to the database");
};

export default connectDB;
