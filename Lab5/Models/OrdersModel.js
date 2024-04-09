const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  price: { type: Number, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Items", required: true }],
});

const Orders = mongoose.model("orders", ordersSchema);

module.exports = Orders;
