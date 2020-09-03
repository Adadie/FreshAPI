"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _posts = _interopRequireDefault(require("./routes/posts.js"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _messages = _interopRequireDefault(require("./routes/messages.js"));

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])()); //CORS Headers

app.use(function (res, req, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PATCH, DELETE,GET, POST');
    return res.status(200).json({});
  }

  next();
}); //Import routes

//connecting mongodb
console.log(process.env.DB_CONNECTION);

_mongoose["default"].connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("conected to mongodb");
  }
});

app.use('/posts', _posts["default"]); //app.use('/comment', commentRoute);

app.use('/users', _users["default"]);
app.use('/messages', _messages["default"]); //ROUTES

app.get('/', function (req, res) {
  res.status(200).send('Hello Rwanda');
}); //Listening

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Server Running on port ".concat(port));
}); //module.exports = app;

var _default = app;
exports["default"] = _default;