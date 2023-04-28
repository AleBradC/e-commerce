import express from "express";
import { Request, Response } from "express";
import MoisturizerProduct from "../../../models/MoisturizerProduct";

const moisturizersProductsRouter = express.Router();

moisturizersProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await MoisturizerProduct.find({}, { _id: 0, __v: 0 });
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default moisturizersProductsRouter;
