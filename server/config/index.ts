import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  uri: process.env.ATLAS_URI,
  localURI: process.env.MONGODB_URI,
};
