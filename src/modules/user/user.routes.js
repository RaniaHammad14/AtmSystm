import express from "express";
import { auth, authorization } from "../../middleware/auth.js";
import systemRoles from "../../../utils/systemRoles.js";
import { validateRequest } from "../../middleware/validation.js";
import * as UV from "./user.validation.js";
import * as UC from "./user.controller.js";
const router = express.Router();

router.post("/signUp", validateRequest(UV.signUp), UC.signUp);
router.post("/signIn", validateRequest(UV.signIn), UC.logIn);
export default router;
