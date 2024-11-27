import express from "express";
import {
  requestPayment,
  cashOut,
  checkBalance,
  callback,
} from "../controllers/payment.js";

const router = express.Router();

router.post("/pay/request", requestPayment);
router.post("/pay/cashout", cashOut);
router.get("/balance", checkBalance);
router.post("/callback", callback);

export default router;
