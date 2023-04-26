import express from "express";
import ProductInfo from "../../models/ProductInfo";

const productInfoRouter = express.Router();

productInfoRouter.get("/:id", async (req, res) => {
  try {
    const product = await ProductInfo.findOne({ id: req.params.id });
    res.send(product);
  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

// productInfoRouter.put('/:id/rating', async (req, res) => {
//   try {
//     const { rating } = req.body;
//     const product = await ProductInfo.findOne({id: req.params.id});
//
//     const updatedProduct = await product.updateOne(
//       {
//         $inc: {rating: rating}
//       }
//     );
//
//     res.send(updatedProduct);
//   } catch (error) {
//     res.status(404);
//     res.send({error: 'Product doesn\'t exist!'});
//   }
// });
//
// productInfoRouter.put('/:id/addComment', async (req, res) => {
//   try {
//     const product = await ProductInfo.findOne({id: req.params.id});
//
//     const { body, commentId } = req.body;
//     const comment = {
//       commentId: commentId,
//       body: body,
//     };
//
//     product.comments.push(comment);
//     product.save();
//     res.send(product);
//
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

export default productInfoRouter;
