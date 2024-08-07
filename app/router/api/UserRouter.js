const express = require("express");
const authController = require("../../modules/user/controller/AuthController");
const { AuthCheck } = require("../../middleware/AuthHelper");


const Router = express.Router();



Router.post("/register",  authController.register);
Router.post("/login", authController.login);
Router.get("/user/dashboard",AuthCheck, authController.UserDashboard);
Router.post("/update-password", AuthCheck, authController.updatePassword);
Router.post("/forget-password", authController.forgetPassword);




module.exports = Router;
