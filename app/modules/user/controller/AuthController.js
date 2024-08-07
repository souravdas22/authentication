const { hashPassword, comparePassword } = require("../../../middleware/AuthHelper");
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const authRepository = require("../Repository/authRepository");

class AuthControlller {
  async register(req, res) {
    try {
      const { name, email, password, mobile, first_school, role, city } =
        req.body;
      //validation
      if (!name) {
        return res.send({ message: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!mobile) {
        return res.send({ message: "Phone no is Required" });
      }
      if (!first_school) {
        return res.send({ message: "First School is Required" });
      }
      //check user
      const exisitingUser = await authRepository.findUser({email});
      //exisiting user
      if (exisitingUser) {
        return res.status(500).send({
          success: false,
          message: "Already Register this Email please login",
        });
      }
      //password hash
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new UserModel({
        name,
        email,
        mobile,
        password: hashedPassword,
        first_school,
        role,
        city,
      });
      await authRepository.register(user);

      return res.status(200).send({
        status: true,
        message: "User Register Successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "Erorr in getting Register",
        error: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(500).send({
          status: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await authRepository.findUser({email});

      if (!user) {
        return res.status(500).send({
          status: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(500).send({
          status: false,
          message: "Invalid Password",
        });
      }
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );
      return res.status(200).send({
        status: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          image: user.image,
          first_school: user.first_school,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "Erorr in getting Register",
        error: error.message,
      });
    }
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
         await authRepository.passwordUpdate(
          user_id,newPassword );

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

const authController = new AuthControlller();

module.exports = authController;
