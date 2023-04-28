import express from "express";
import { Request, Response } from "express";
import FaceOilProduct from "../../../models/FaceOilProduct";

const faceOilsProductsRouter = express.Router();

faceOilsProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await FaceOilProduct.find({}, { _id: 0, __v: 0 });
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default faceOilsProductsRouter;
