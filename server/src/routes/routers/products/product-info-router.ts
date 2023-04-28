import express from "express";
import { Request, Response } from "express";
import ProductInfo from "../../../models/ProductInfo";

const productInfoRouter = express.Router();

productInfoRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await ProductInfo.findOne({ id: req.params.id });

    res.send(product);
  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

export default productInfoRouter;
