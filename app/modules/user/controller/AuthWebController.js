const {
  hashPassword,
  comparePassword,
} = require("../../../middleware/AuthHelper");
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const authRepository = require("../Repository/AuthRepository");

class AuthWebController {
  // view
  async viewLoginPage(req, res) {
    try {
      await res.render("login");
    } catch (error) {
      console.log(error);
    }
  }
  async viewRegisterPage(req, res) {
    try {
      await res.render("register");
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {
    
  }

  async login(req, res) {
   
  }

  async UserDashboard(req, res) {
    const a = req.user;
    res.status(200).json({
      message: "user dashboard",
      data: a,
    });
  }

  async updatePassword(req, res) {
    try {
      const user_id = req.body.id;
      const { password } = req.body;

      //check userid exist ir not
      const data = await authRepository.findUser({ _id: user_id });
      if (data) {
        const newPassword = await hashPassword(password);
        await authRepository.passwordUpdate(user_id, newPassword);

        res
          .status(201)
          .send({ success: true, msg: "your password hasbeen updated" });
      } else {
        res.status(400).send({ succses: false, msg: "user id Not found" });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async forgetPassword(req, res) {
    try {
      const { email, first_school, newPassword } = req.body;
      if (!email) {
        return res.status(500).send({ message: "Email is required" });
      }
      if (!first_school) {
        return res.status(500).send({ message: "school name is required" });
      }
      if (!newPassword) {
        return res.status(500).send({ message: "New Password is required" });
      }
      //check email exist or not
      const user = await authRepository.findUser({ email, first_school });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "wrong Email or school name",
        });
      }
      const heased = await hashPassword(newPassword);
      await authRepository.passwordUpdate(user._id, heased);
      return res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Errro in forget password",
        error,
      });
    }
  }
}

const authController = new AuthWebController();

module.exports = authController;
