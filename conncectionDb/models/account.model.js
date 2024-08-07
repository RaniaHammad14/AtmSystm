import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
      min: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction", // Reference to the transaction model
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
const accountModel = mongoose.model("account", accountSchema);

export default accountModel;
