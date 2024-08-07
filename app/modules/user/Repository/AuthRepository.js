const UserModel = require("../model/user");

class AuthRepositories {
  async findUser(data) {
    try {
      const user = await UserModel.findOne(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async register(data) {
    try {
      const newUser = await UserModel.create(data);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  async passwordUpdate(user_id, newPassword) {
    try {
      const updatedPassword = await UserModel.findByIdAndUpdate(
        { _id: user_id },
        {
          $set: {
            password: newPassword,
          },
        }
      );
      return updatedPassword;
    } catch (error) {
      console.log(error);
    }
  }
}

const authRepository = new AuthRepositories();

module.exports = authRepository;
