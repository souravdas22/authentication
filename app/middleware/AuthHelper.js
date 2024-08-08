
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    const saltPassword = 10;
    const hashPassword = await bcrypt.hash(password, saltPassword);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};



// Auth check 
const AuthCheck = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ "status": false, "message": "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
    } catch (err) {
        return res.status(401).send({ "status": false, "message": "invalid Token Access" });
    }
    return next();

}



module.exports = {
  hashPassword,
  comparePassword,
  AuthCheck,
};