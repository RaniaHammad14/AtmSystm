import userModel from "../../../conncectionDb/models/user.model.js";
import AppError from "../../../utils/appError.js";
import { asyncHandler } from "../../../utils/globalHandlingError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, password, email, age, role } = req.body;
  const emailExist = await userModel.findOne({ email: email.toLowerCase() });
  emailExist && next(new AppError("User already exists", 501));

  const hash = bcrypt.hashSync(password, 8);
  const user = new userModel({ name, password: hash, email, age, role });
  const newUser = await user.save();
  newUser ? res.status(201).json({ msg: "User added successfully", user }) : next(new AppError("Failed adding user", 501));
});

export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new AppError("User Not Found", 400));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid Password", 501));
  }
 
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, password: user.password, role: user.role },
    "atm"
  );

  return res.status(200).json({ msg: "done", token });
});
