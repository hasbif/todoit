const express = require("express");
const route = express.Router();
const todoroute = require("./todoroutes");
const UserController = require("../controllers/usercontroller");
route.post("/register", UserController.register);
route.post("/login", UserController.login);
route.use("/todo", todoroute);

module.exports = route;