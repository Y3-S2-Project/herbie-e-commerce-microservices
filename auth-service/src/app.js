require("dotenv").config();
const express = require("express");
import cors from "cors";
import routes from "./routes/index.routes.js";
import connectDB from "./database";

const app = express();
app.use(cors());

app.use(express.json({ limit: "1mb" }));
app.get("/", (req, res) =>
  res.status(200).json({ message: "Herbie Auth Server Up and Running" })
);
app.use("/api", routes);
connectDB();

// Auth service is runiing on port 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Herbie Auth server successfully started on port ${port}`);
});
