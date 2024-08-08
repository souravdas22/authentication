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
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "app", "modules", "employee", "views"),
  path.join(__dirname, "app", "modules", "user", 
    "views"),
  path.join(__dirname, "views"),
]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // For UI
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving Public folder statically
app.use(express.static(path.join(__dirname, "public")));

const cookieParser = require("cookie-parser");
app.use(cookieParser());


// web routes
const employeeWebRouter = require("./app/router/employeeRoute");
const userWebRouter = require("./app/router/userWebRouter");

app.use(employeeWebRouter);
app.use(userWebRouter);

// api routes
const employeeApiRouter = require("./app/router/api/employeeRouter");
const UserApiRoutre = require("./app/router/api/UserRouter");
app.use("/employee/api", employeeApiRouter);
app.use("/auth/api", UserApiRoutre);

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is connected at http://localhost:${port}`);
});
