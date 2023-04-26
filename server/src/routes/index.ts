import express from "express";

import productsRouter from "./routers/products/products-router";
import browsProductsRouter from "./routers/products/brows-products-router";
import cleansersProductsRouter from "./routers/products/cleansers-products-router";
import faceOilsProductsRouter from "./routers/products/face-oils-products-router";
import faceSerumsProductsRouter from "./routers/products/face-serums-products-router";
import lipGlossesProductsRouter from "./routers/products/lip-glosses-products-router";
import lipSticksProductsRouter from "./routers/products/lip-sticks-products-router";
import mascaraProductsRouter from "./routers/products/mascara-products-router";
import moisturizersProductsRouter from "./routers/products/moisturizers-products-router";
import newArrivalProductsRouter from "./routers/products/new-arrival-products-router";

const router = express.Router();

router.use("/", productsRouter);
router.use("/brows-products", browsProductsRouter);
router.use("/mascara-products", mascaraProductsRouter);
router.use("/lip-glosses-products", lipGlossesProductsRouter);
router.use("/lip-sticks-products", lipSticksProductsRouter);
router.use("/cleansers-products", cleansersProductsRouter);
router.use("/moisturizers-products", moisturizersProductsRouter);
router.use("/face-oils-products", faceOilsProductsRouter);
router.use("/face-serums-products", faceSerumsProductsRouter);
router.use("/new-arrival-products", newArrivalProductsRouter);

export default router;
