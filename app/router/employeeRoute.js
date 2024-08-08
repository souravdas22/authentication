const express = require("express");
const EmployeeWebController = require("../modules/employee/controller/EmployeeController");
const {  AuthCheckPages } = require("../middleware/AuthHelper");

const employeeWebRouter = express.Router();

employeeWebRouter.get("/", EmployeeWebController.viewHome);
employeeWebRouter.get(
  "/employee",
  EmployeeWebController.addemployee
);
employeeWebRouter.get(
  "/employee/:id",
  EmployeeWebController.viewEditPage
);

//crud
employeeWebRouter.post(
  "/create-employee",
  EmployeeWebController.createEmployee
);
employeeWebRouter.post(
  "/update-employee/:id",
  EmployeeWebController.updateemployee
);
employeeWebRouter.get("/delete/:id", EmployeeWebController.deleteemployee);

module.exports = employeeWebRouter;
