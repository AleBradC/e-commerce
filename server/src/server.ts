import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import config from "../config";
import router from "./routes";

import cartRouter from "./routes/routers/cart-router";
import productInfoRouter from "./routes/routers/product-info-router";

const app = express();
const port = config.port;
const uri = config.uri as string;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

app.use("/api/products", router);
app.use("/api/cart", cartRouter);
app.use("/", productInfoRouter);

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});

mongoose
  .set("strictQuery", false)
  .connect(uri)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
