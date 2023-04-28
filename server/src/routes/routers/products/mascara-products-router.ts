import express from "express";
import { Request, Response } from "express";
import MascaraProduct from "../../../models/MascaraProduct";

const mascaraProductsRouter = express.Router();

mascaraProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await MascaraProduct.find({}, { _id: 0, __v: 0 });
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default mascaraProductsRouter;
