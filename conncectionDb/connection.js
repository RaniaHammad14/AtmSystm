import mongoose from "mongoose";

const connection = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/ATMSystem")
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log("Failed to connect to Database", err);
    });
};

export default connection;
