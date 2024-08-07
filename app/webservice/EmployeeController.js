const { EmployeeModel } = require("../modules/employee/model/Employee");
const employeeRepository = require("../modules/employee/Repository/EmployeeRepository");

class EmployeeApiController {
  async createEmployee(req, res) {
    try {
      const { first_name, last_name, email, phone, designation } = req.body;
        const existingEmployee = await EmployeeModel.findOne({email});
      if (existingEmployee) {
          return res.status(500).json({
            message: "employee already exists",
          });
        }
      const addData = {
        first_name,
        last_name,
        email,
        phone,
        designation,
      };
      const result = await employeeRepository.save(addData);
      return res.json({
        status:201,
        message: "user created sucessfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await employeeRepository.getEmployees();
      return res.json({
        status:200,
        message: "All employees fetched successfully",

        data: employees,
        total: employees.length,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async singleEmployee(req, res) {
    try {
      const id = req.params.id;
      const employee = await employeeRepository.singleEmployee(id);
      return res.json({
        status:200,
        message: "Single employee data fetched sucessfully",
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async employeeUpdate(req, res) {
    try {
      const id = req.params.id;
      const bodyData = req.body;
      await employeeRepository.update(id, bodyData);
      return res.json({
        status:200,
        message: "employee updated sucessfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async deleteEmployee(req, res) {
    try {
      const id = req.params.id;
      await employeeRepository.delete(id)
      return res.json({
        message: "employee deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new EmployeeApiController();
