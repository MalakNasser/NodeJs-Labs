const express = require("express");
const routes = new express.Router();
const OrdersController = require("../Controllers/ordersController");

//Get All Orders
routes.get("/", OrdersController.GetAllOrders);
//Get Order By ID
routes.get("/:id", OrdersController.GetOrderByID);
//Add New Order
routes.post("/", OrdersController.AddOrder);
//UPdate Order By ID
routes.put("/:id", OrdersController.UpdateOrderById);
//Delete Order By ID
routes.delete("/:id", OrdersController.DeleteOrderById);

module.exports = routes;
