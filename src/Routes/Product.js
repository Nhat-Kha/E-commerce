import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../Middleware/utils.js";
import {
  CreateProduct,
  getProduct,
  updateProduct,
} from "../Controller/Product.js";

const productRoute = express.Router();

productRoute.get("/", getProduct);
productRoute.put("/:id", isAuth, isAdmin, expressAsyncHandler(updateProduct));
productRoute.post("/", isAuth, isAdmin, expressAsyncHandler(CreateProduct));

export default productRoute;
