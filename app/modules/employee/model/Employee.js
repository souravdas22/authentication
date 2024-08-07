const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const EmployeeSchemaValidation = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  designation: Joi.string().required(),
});

const employeeSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required:[true,"email is required"]
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    designation: {
      type: String,
      required:[true,"role is required"]
    },
   
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

const EmployeeModel = mongoose.model("employee", employeeSchema);
module.exports = { EmployeeModel, EmployeeSchemaValidation };
