import accountModel from "../../../conncectionDb/models/account.model.js";
import AppError from "../../../utils/appError.js";
import { asyncHandler } from "../../../utils/globalHandlingError.js";
import userModel from "../../../conncectionDb/models/user.model.js";
import transactionModel from "../../../conncectionDb/models/transactions.model.js";
//===============================addAccount==================================//

export const addAccount = asyncHandler(async (req, res, next) => {
  const { balance } = req.body;
  const emailExist = await userModel.findById(req.user.id);
  if (!emailExist) {
    return next(new AppError("User Not Found", 400));
  }

  const account = new accountModel({ userId: req.user.id, balance: balance });
  const newAccount = await account.save();
  newAccount ? res.status(201).json({ msg: "Account added successfully", account }) : next(new AppError("Failed adding Account", 501));
});
//===============================addMoney==================================//
export const addMoney = asyncHandler(async (req, res, next) => {
  const { id, amount } = req.body;
  if (!id || typeof amount !== "number" || amount <= 0) {
    return next(new AppError("Invalid input data", 400));
  }
  const accountExist = await accountModel.findById(id);

  if (!accountExist) {
    return next(new AppError("Account not found", 404));
  }

  accountExist.balance += amount;
  const newTransaction = new transactionModel({
    accountId: id,
    userId: req.user.id,
    type: "deposit",
    amount,
  });

  await newTransaction.save();

  accountExist.transactions.push(newTransaction._id);
  await accountExist.save();

  res.status(200).json({
    message: "Money added successfully",
    accountExist,
  });
});
//===============================withdrawMoney==================================//
export const withdrawMoney = asyncHandler(async (req, res, next) => {
  const { id, amount } = req.body;

  if (!id || typeof amount !== "number" || amount <= 0) {
    return next(new AppError("Invalid input data", 400));
  }

  const account = await accountModel.findById(id);

  if (!account) {
    return next(new AppError("Account not found", 404));
  }

  if (account.balance < amount) {
    return next(new AppError("Insufficient funds", 400));
  }

  account.balance -= amount;
  const newTransaction = new transactionModel({
    accountId: id,
    userId: req.user.id,
    type: "withdrawal",
    amount,
  });

  await newTransaction.save();

  account.transactions.push(newTransaction._id);
  await account.save();

  res.status(200).json({
    message: "Withdrawal successful",
    account,
  });
});
//===============================getAccountBalance==================================//
export const getAccountBalance = asyncHandler(async (req, res, next) => {
  const { id } = req.query;

  const account = await accountModel.findOne({ id });

  if (!account) {
    return next(new AppError("Account not found", 404));
  }

  res.status(200).json({
    account,
  });
});
//===============================getTransactions==================================//

export const getTransactions = asyncHandler(async (req, res, next) => {
  const { accountId } = req.body;

  if (!accountId) {
    return next(new AppError("Account ID is required", 400));
  }

  const transactions = await transactionModel.find({ accountId }).populate("userId", "email");

  if (!transactions || transactions.length === 0) {
    return next(new AppError("No transactions found for this account", 404));
  }

  res.status(200).json({
    transactions,
  });
});
