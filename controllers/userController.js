import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .json({
          status: "failed",
          message: "user with this email already exists",
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({
        status: "success",
        message: "user created successfully",
        data: newUser,
      });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

export const authUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(404)
        .json({
          status: "failed",
          message: "user with this email is not fount",
        });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
     return res
        .status(200)
        .json({
          status: "success",
          message: "you are logged in successfully",
          token: jwt.sign({ userId: user._id }, "myultrasecret", {
            expiresIn: "1d",
          }),
        });
    } else{
        return res.status(400).json({ status: "failed", message: "Incorrect password"})
    }
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({
        status: "success",
        message: "users fetched successfully",
        data: users,
      });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

// get user a specific user

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error("User not found");
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update user

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) throw Error("User not found");
    res.json({
      status: "success: user updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete user

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw Error("User not found");
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
