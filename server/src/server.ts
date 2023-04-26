import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import config from "../config";
import products from "./routes/products";
import browsProducts from "./routes/browsProducts";
import cleansersProducts from "./routes/cleansersProducts";
import faceOilsProducts from "./routes/faceOilsProducts";
import faceSerumsProducts from "./routes/faceSerumsProducts";
import lipGlossesProducts from "./routes/lipGlossesProducts";
import lipSticksProducts from "./routes/lipSticksProducts";
import mascaraProducts from "./routes/mascaraProducts";
import moisturizersProducts from "./routes/moisturizersProducts";
import newArrivalProducts from "./routes/newArrivalProducts";
import cart from "./routes/cart";
import productInfo from "./routes/productInfo";

const app = express();
const port = config.port;
const uri = config.uri as string;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

app.use("/api/products", products);
app.use("/api/products/brows-products", browsProducts);
app.use("/api/products/mascara-products", mascaraProducts);
app.use("/api/products/lip-glosses-products", lipGlossesProducts);
app.use("/api/products/lip-sticks-products", lipSticksProducts);
app.use("/api/products/cleansers-products", cleansersProducts);
app.use("/api/products/moisturizers-products", moisturizersProducts);
app.use("/api/products/face-oils-products", faceOilsProducts);
app.use("/api/products/face-serums-products", faceSerumsProducts);
app.use("/api/products/new-arrival-products", newArrivalProducts);

// app.use("/api/cart", cart);
// app.use("/api/productInfo/product", productInfo);

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});

mongoose
  .set("strictQuery", false)
  .connect(uri)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
