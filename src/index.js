import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/User.js";
import productRoute from "./Routes/Product.js";

dotenv.config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connect");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/upload");
// app.use("/api/seed");
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
// app.use("/api/orders");

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Connect server successfully ${PORT}`);
});
