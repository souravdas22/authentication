const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongodb Database");
  } catch (error) {
    console.log(`Error in Mongodb database ${error}`);
  }
};

module.exports = connectDB;
