const express = require("express");
const routes = new express.Router();
const ItemsController = require("../Controllers/itemsController");

//Get All Items
routes.get("", ItemsController.GetAllItems);
//Get Item By ID
routes.get("/:id", ItemsController.GetItemByID);
//Add New Item
routes.post("/", ItemsController.AddItem);
//UPdate Item By ID
routes.put("/:id", ItemsController.UpdateItemById);
//Delete Item By ID
routes.delete("/:id", ItemsController.DeleteItemById);

module.exports = routes;
