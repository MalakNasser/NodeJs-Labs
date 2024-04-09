//#Start Region Requires
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/NodeJsLab5");
const db = mongoose.connection;

const OrdersRoutes = require("./Routes/OrdersRoutes");
const ItemsRoutes = require("./Routes/ItemsRoutes");
const UsersRoutes = require("./Routes/UsersRoutes");
//#End Region

//#Start Region MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//#End Region

//#Start Region Routes
app.use("/api/orders", OrdersRoutes);
app.use("/api/items", ItemsRoutes);
app.use("/api/users", UsersRoutes);
//#End Region

//#Start Region  Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
//#End Region

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
