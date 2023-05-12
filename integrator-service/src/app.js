const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
// app.use(cors({}));

app.use(express.json());

app.use("/auth", proxy("http://localhost:3001/"));
app.use("/notification", proxy("http://localhost:3002/"));
app.use("/product", proxy("http://localhost:3003/"));
app.use("/order", proxy("http://localhost:3004/"));
app.use("/cart", proxy("http://localhost:3005/"));
app.use("/review", proxy("http://localhost:3006/"));
app.use("/payment", proxy("http://localhost:3008/"));
app.use("/delivery", proxy("http://localhost:3009/"));
app.use("/commission", proxy("http://localhost:3010/"));

app.listen(8000, () => {
  console.log("Integrator service is listning on port 8000 ");
});
