import express from "express";
import { Request, Response } from "express";
import CleanserProduct from "../../../models/CleanserProduct";

const cleansersProductsRouter = express.Router();

cleansersProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await CleanserProduct.find({}, { _id: 0, __v: 0 });
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default cleansersProductsRouter;
