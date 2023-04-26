import express from "express";
import { Request, Response } from "express";
import LipStickProduct from "../../../models/LipStickProduct";

const lipSticksProductsRouter = express.Router();

lipSticksProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await LipStickProduct.find();
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default lipSticksProductsRouter;
