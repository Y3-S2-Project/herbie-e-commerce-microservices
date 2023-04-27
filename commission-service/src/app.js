require("dotenv").config();
const express = require("express");
import cors from "cors";
import routes from "./routes/index.routes.js";
import connectDB from "./database";

const app = express();
app.use(cors());

app.use(express.json({ limit: "1mb" }));
app.get("/", (req, res) =>
  res.status(200).json({ message: "Commission Service Up and Running" })
);
app.use("/api", routes);
connectDB();

// Commision service
const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Commission Service successfully started on port ${port}`);
});
