import express from "express";
import { Request, Response } from "express";
import LipGlossProduct from "../../../models/LipGlossProduct";

const lipGlossesProductsRouter = express.Router();

lipGlossesProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await LipGlossProduct.find();
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default lipGlossesProductsRouter;
