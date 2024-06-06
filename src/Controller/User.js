import bcrypt from "bcryptjs";

import User from "../Model/UserModel.js";
import { generateToken } from "../Middleware/utils.js";

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

const getUserWithId = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

const UpdateUserAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updateUser = await user.save();
    res.send({ message: "Update successfully", user: updateUser });
  } else {
    res.status(404).send({ message: "user not found" });
  }
};

const SignIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.send({ message: "Invalid email or password" });
};

const SignUp = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  // console.log(newUser);
  const user = await newUser.save();
  console.log(user);
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
};

const DeleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.email === "admin@example.com") {
      res.status(400).send({ message: "Can not delete Admin User" });
      return;
    }
    await user.remove();
    res.send({ message: "User deleted successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export {
  getUsers,
  getUserWithId,
  UpdateUserAdmin,
  SignIn,
  SignUp,
  DeleteUser,
  UpdateProfile,
};
