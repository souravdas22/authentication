const { EmployeeModel} = require("../model/Employee");
const EmployeeRepository = require("../Repository/EmployeeRepository");
class EmployeeWebController {
  async viewHome(req, res) {
    const result = await EmployeeModel.find({ deleted: false }, { __v: 0 });

    res.render("home.ejs", {
      employees: result,
    });
  }
  async addemployee(req, res) {
    res.render("addEmployee");
  }

  async viewEditPage(req, res) {
    try {
      const employeeId = req.params.id;

      const result = await EmployeeModel.findById(employeeId, { __v: 0 });

      if (!result) {
        return res.status(400).json({
          message: "employee not found in the database",
        });
      } else {
        res.render("editEmployee", {
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async createEmployee(req, res) {
    try {
      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        designation: req.body.designation,
      };

      await EmployeeRepository.save(data);

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }

  async updateemployee(req, res) {
    try {
      const employeeId = req.params.id;

      const employeeData = req.body;

      await EmployeeRepository.update(employeeId,employeeData);

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteemployee(req, res) {
    try {
      const id = req.params.id;
      await EmployeeRepository.delete(id);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new EmployeeWebController();
