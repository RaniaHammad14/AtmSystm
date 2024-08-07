import express from "express";
import { auth, authorization } from "../../middleware/auth.js";
import { validateRequest } from "../../middleware/validation.js";
import * as AV from "./account.validation.js";
import * as AC from "./account.controller.js";
const router = express.Router();

router.post("/addAccount", auth(), validateRequest(AV.addAccount), AC.addAccount);
router.post("/addBalance", auth(), AC.addMoney);
router.post("/withdrawMoney", auth(), AC.withdrawMoney);
router.get("/balance", auth(), AC.getAccountBalance);
router.get("/transactions", auth(), AC.getTransactions);
export default router;
