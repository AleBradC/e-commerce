import express from "express";
import { Request, Response } from "express";
import BrowProduct from "../../../models/BrowProduct";

const browsProductsRouter = express.Router();

browsProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await BrowProduct.find();
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default browsProductsRouter;
