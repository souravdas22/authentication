const mongoose = require("mongoose");

const user = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name require"],
  },
  email: {
    type: String,
    required: [true, "email require"],
  },
  password: {
    type: String,
    required: [true, "password require"],
  },
  image: {
    type: String,
    default: "image",
  },
  mobile: {
    type: String,
    required: [true, "mobile require"],
  },
  first_school: {
    type: String,
    required: [true, "school name require"],
  },
  city: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["USER", "HR", "ADMIN"],
    default: "USER",
  },
});

module.exports = mongoose.model("user", user);
