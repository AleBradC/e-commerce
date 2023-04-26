import express from "express";
import { Request, Response } from "express";
import NewArrivalProduct from "../../../models/NewArrival";

const newArrivalProductsRouter = express.Router();

newArrivalProductsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await NewArrivalProduct.find();
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default newArrivalProductsRouter;
