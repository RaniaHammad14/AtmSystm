import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);
const userModel = mongoose.model("user", userSchema);

export default userModel;
