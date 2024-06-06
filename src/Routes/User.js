import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  DeleteUser,
  getUsers,
  getUserWithId,
  SignIn,
  SignUp,
  UpdateProfile,
  UpdateUserAdmin,
} from "../Controller/User.js";
import { isAdmin, isAuth } from "../Middleware/utils.js";

const userRoute = express.Router();

userRoute.get("/", isAuth, isAdmin, expressAsyncHandler(getUsers));

userRoute.get("/:id", isAuth, isAdmin, expressAsyncHandler(getUserWithId));

userRoute.put("/:id", isAuth, isAdmin, expressAsyncHandler(UpdateUserAdmin));

userRoute.post("/signin", expressAsyncHandler(SignIn));
userRoute.post("/signup", expressAsyncHandler(SignUp));

userRoute.delete("/:id", isAuth, isAdmin, expressAsyncHandler(DeleteUser));
userRoute.put("/profile/:id", isAuth, expressAsyncHandler(UpdateProfile));

export default userRoute;
