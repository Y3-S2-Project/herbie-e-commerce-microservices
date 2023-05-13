require("dotenv").config();
const express = require("express");
import cors from "cors";
import routes from "./routes/index.routes.js";
import connectDB from "./database";

const app = express();
app.use(express.static("public"));
app.use(cors());

app.use(express.json({ limit: "1mb" }));
app.get("/", (req, res) =>
  res.status(200).json({ message: "Payment Server Up and Running" })
);
app.use("/api", routes);
connectDB();

// Start the server
const port = process.env.PORT || 3008;
app.listen(port, () => {
  console.log(`Payment Service successfully started on port ${port}`);
});
