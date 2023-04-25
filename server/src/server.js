const { cors } = require(cors);
const { express } = require(express);
const { mongoose } = require(mongoose);
const { dotenv } = require(dotenv);

import cart from "./routes/cart.js";
import productInfo from "./routes/productInfo.js";

import products from "./routes/products.js";
import browsProducts from "./routes/browsProducts.js";
import mascaraProducts from "./routes/mascaraProducts.js";
import lipGlossesProducts from "./routes/lipGlossesProducts.js";
import lipSticksProducts from "./routes/lipSticksProducts.js";
import cleansersProducts from "./routes/cleansersProducts.js";
import moisturizersProducts from "./routes/moisturizersProducts.js";
import faceOilsProducts from "./routes/faceOilsProducts.js";
import faceSerumsProducts from "./routes/faceSerumsProducts.js";
import newArrivalProducts from "./routes/newArrivalProducts.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", products);
app.use("/api/products/brows-products", browsProducts);
app.use("/api/products/mascara-products", mascaraProducts);
app.use("/api/products/lip-glosses-products", lipGlossesProducts);
app.use("/api/products/lip-sticks-products", lipSticksProducts);
app.use("/api/products/cleansers-products", cleansersProducts);
app.use("/api/products/moisturizers-products", moisturizersProducts);
app.use("/api/products/face-oils-products", faceOilsProducts);
app.use("/api/products/face-serums-products", faceSerumsProducts);
app.use("/api/products/new-arrival-products", newArrivalProducts);

app.use("/api/cart", cart);
app.use("/api/productInfo/product", productInfo);

app.get("/", (req, res) => {
  res.send("HELLO :D ");
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
