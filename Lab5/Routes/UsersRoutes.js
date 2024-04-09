const express = require("express");
const routes = new express.Router();
const UsersController = require("../Controllers/usersController");

//Get All Users
routes.get("/", UsersController.GetAllUsers);
//Get User By ID
routes.get("/:id", UsersController.GetUserByID);
//Register
routes.post("/register", UsersController.Register);
//Login
routes.post("/login", UsersController.Login);
//UPdate User By ID
routes.put("/:id", UsersController.UpdateUserById);
//Delete User By ID
routes.delete("/:id", UsersController.DeleteUserById);

module.exports = routes;
