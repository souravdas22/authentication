const { EmployeeModel } = require("../model/Employee");

class EmployeeRepository {
  async getEmployees() {
    try {
      const employees = await EmployeeModel.find({deleted:false});
      return employees;
    } catch (error) {
      console.log(error);
    }
  }
  async save(data) {
    try {
    
      const newEmployee = await EmployeeModel.create(data);
      return newEmployee;
    } catch (error) {
      console.log(error);
    }
  }
  async singleEmployee(id) {
    try {
      const employee = await EmployeeModel.findById(id);
      return employee;
    } catch (error) {
      console.log(error);
    }
  }
  async update(id, bodyData) {
    try {
      const updateData = await EmployeeModel.findByIdAndUpdate(id, bodyData, {
        new: true,
      });
      return updateData;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id) {
    try {
      const deletedEmployee = await EmployeeModel.findByIdAndUpdate(
        id,
        { deleted: true },
        {
          new: true,
        }
      );
      return deletedEmployee;
    } catch (error) {
      console.log(error);
    }
  }
}

const employeeRepository = new EmployeeRepository();

module.exports = employeeRepository;
