import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    isAdmin: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
