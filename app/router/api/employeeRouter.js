const express = require("express");
const EmployeeApiController = require("../../webservice/EmployeeController");
const { AuthCheck } = require("../../middleware/AuthHelper");
const employeeRouter = express.Router();

employeeRouter.get("/", AuthCheck, EmployeeApiController.getAllEmployees);
employeeRouter.post("/create", AuthCheck, EmployeeApiController.createEmployee);
employeeRouter.get(
  "/employee/:id",
  AuthCheck,
  EmployeeApiController.createEmployee
);
employeeRouter.post(
  "/employee-edit/:id",
  AuthCheck,
  EmployeeApiController.employeeUpdate
);
employeeRouter.post(
  "/delete/:id",
  AuthCheck,
  EmployeeApiController.deleteEmployee
);

module.exports = employeeRouter;
