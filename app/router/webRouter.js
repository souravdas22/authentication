const express = require("express");
const webRouter = express.Router();

const employeeController = require('../modules/employee/controller/EmployeeWebController')

const uploadeProductImage = require("../helper/productImage");

webRouter.get("/",employeeController.homePage);

webRouter.get("/create-employee", employeeController.createEmployeePage);

webRouter.post(
  "/api/create-employee",
  uploadeProductImage.single("image"),
  employeeController.createEmployee
);

webRouter.get("/edit-employee/:id",employeeController.editEmployee);

webRouter.post(
  "/api/update-employee/:id",
  uploadeProductImage.single("image"),
  employeeController.updateEmployee
);

webRouter.post("/api/delete-employee/:id", employeeController.deleteEmployee);



module.exports = webRouter;
