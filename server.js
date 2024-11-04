import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'
// const postRouter = require('./routes/postRouter.js')
import morgan from "morgan";
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.listen(port, console.log(`🚀 server started on port ${port}`));
mongoose
  .connect(process.env.DB)
  .then((res) => console.log("db connected "))
  .catch((err) => console.log(err.message));


app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: "Welcome to Leon-shop API" });
})

app.use('/users', userRoute);
app.use('/posts', postRouter);


app.use('/*', (req, res) => {
  res.status(404).json({ status: 404, message: "Url Not Found" });
})
