import express from "express";
import { Request, Response } from "express";
import Product from "../models/Poduct";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default router;
