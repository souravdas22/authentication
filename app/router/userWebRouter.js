const express = require("express");
const authWebController = require("../modules/user/controller/AuthWebController");

const userRouter = express.Router();

userRouter.get("/register", authWebController.viewRegisterPage);
userRouter.get("/login", authWebController.viewLoginPage);
// userRouter.get("/user/dashboard", AuthCheck, authWebController.UserDashboard);
// userRouter.post("/update-password", AuthCheck, authWebController.updatePassword);
// userRouter.post("/forget-password", authWebController.forgetPassword);


module.exports = userRouter;
