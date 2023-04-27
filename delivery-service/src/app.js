require("dotenv").config();
const express = require("express");
import cors from "cors";
import routes from "./routes/index.routes.js";
import connectDB from "./database";

const app = express();
app.use(cors());

app.use(express.json({ limit: "1mb" }));
app.get("/", (req, res) =>
  res.status(200).json({ message: "Delivery Server Up and Running" })
);
app.use("/api", routes);
connectDB();


// Start delivery service
const port = process.env.PORT || 3009;
app.listen(port, () => {
  console.log(`Delivery Service successfully started on port ${port}`);
});
