const express = require("express");
const log = require('morgan')('dev');
const bodyParser = require("body-parser");

const properties = require("./config/properties");
const db = require("./config/database");

const cors = require('cors');

const session = require("express-session")

const userRoutes = require("./api/user/user.routes");
const stuffRoutes = require("./api/stuff/stuff.routes");
const requestRoutes = require("./api/request/request.routes");
const app = express();

//initialise express router
const router = express.Router();

// call the database connectivity function
db();

// configure app.use()
app.use(log);
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

app.use(session({
  secret: 'mari berbagi kuy',
  resave: true,
  saveUninitialized: false
}));

// use express router
app.use('/api', router);
userRoutes(router);
stuffRoutes(router);
requestRoutes(router);

app.listen(properties.PORT, '0.0.0.0', (req, res) => {
  console.log(`Server is running on ${properties.PORT} port.`);
});
