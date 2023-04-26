import express from "express";
import CartProduct from "../../models/CartProduct";

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  try {
    const cartProducts = await CartProduct.find();
    res.send(cartProducts);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

cartRouter.delete("/:id/delete", async (req, res) => {
  try {
    await CartProduct.deleteOne({ id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

// ALL
cartRouter.delete("/delete", async (req, res) => {
  try {
    await CartProduct.remove();

    res.status(204).send();
  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

cartRouter.put("/:id/add", async (req, res) => {
  try {
    const { id, brand, name, imageURL, price, quantity } = req.body;
    const product = await CartProduct.findOne({ id: req.params.id });

    if (!product) {
      const cartProduct = new CartProduct({
        _id: id,
        id: id,
        brand: brand,
        name: name,
        imageURL: imageURL,
        price: price,
        quantity: quantity,
      });

      await cartProduct.save();
      return res.send(cartProduct);
    }

    const updatedProduct = await product.updateOne({
      $inc: { quantity: quantity },
    });
    return res.send(updatedProduct);
  } catch (error) {
    return res.status(404);
    // res.send({ error: "Product doesn't exist!" });
  }
});

cartRouter.put("/:id/increaseQuantity", async (req, res) => {
  try {
    const product = await CartProduct.findOne({ id: req.params.id });

    const updatedProduct = await product?.updateOne({
      $inc: { quantity: 1 },
    });

    res.send(updatedProduct);
  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

cartRouter.put("/:id/decreaseQuantity", async (req, res) => {
  try {
    const product = await CartProduct.findOne({ id: req.params.id });
    const updatedProduct = await product?.updateOne({
      $inc: { quantity: -1 },
    });
    res.send(updatedProduct);
  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

export default cartRouter;
