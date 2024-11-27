// import { PaypackJs } from "paypack-js";
import dotenv from "dotenv";
import crypto from "crypto";
import pkg from 'paypack-js';
const { PaypackJs } = pkg;
dotenv.config();

 const paypack = new PaypackJs({
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
  });

// Request Payment
export const requestPayment = async (req, res) => {
  const { paymentNumber, amount } = req.body;

  try {
    const response = await paypack.cashin({
      number: paymentNumber,
      amount: amount,
      environment: "development",
    });
    console.log(response);
    res.status(201).json({
      message: "Payment initiated successfully. Please confirm your payment.",
      data: response.data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cash Out
export const cashOut = async (req, res) => {
  const { paymentNumber, amount } = req.body;

  try {
    const response = await paypack.cashout({
      number: paymentNumber,
      amount: amount,
      environment: "development",
    });
    res.status(201).json({
      message: "Your cashout was made successfully!",
      data: response.data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Check Balance
export const checkBalance = async (req, res) => {
  try {
    const response = await paypack.me();
    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Handle Callback
export const callback = async (req, res) => {
  const requestHash = req.get("X-Paypack-Signature");
  const secret = process.env.PAYPACK_WEBHOOK_SIGN_KEY;

  // Validate webhook authenticity
  const hash = crypto
    .createHmac("sha256", secret)
    .update(req.rawBody)
    .digest("base64");

  if (hash === requestHash && req.method === "HEAD") {
    handlePaypackWebhook(req.body);
    res.status(200).send("Webhook Received");
  } else {
    res.status(403).send("Invalid Webhook Signature");
  }
};

// Process Webhook Payload
function handlePaypackWebhook(payload) {
  const { status: paymentStatus } = payload;

  if (paymentStatus === "success") {
    console.log("Payment successful:", payload);
  } else {
    console.log("Payment failed:", payload);
  }
}
