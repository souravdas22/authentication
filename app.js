const express = require("express");
const path = require("path");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");

// Load .env files in node application
dotEnv.config();

const app = express();

// Connect Database
const connectDB = require("./app/config/db");
connectDB();

// Connect View Engine


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); // For UI
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving Public folder statically
app.use(express.static(path.join(__dirname, "public")));

// Connect router
const employeeRouter = require("./app/router/api/employeeRouter");
const UserRoutre = require("./app/router/api/UserRouter");
app.use("/auth/api", UserRoutre);
app.use("/employee/api", employeeRouter);

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is connected at http://localhost:${port}`);
});
