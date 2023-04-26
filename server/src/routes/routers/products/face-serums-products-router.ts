import express from "express";
import { Request, Response } from "express";
import FaceSerumProduct from "../../../models/FaceSerumProduct";

const faceSerumsProductsRouter = express.Router();

faceSerumsProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await FaceSerumProduct.find();
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default faceSerumsProductsRouter;
