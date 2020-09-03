"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var UserSchema = _mongoose["default"].Schema({
  Fname: {
    type: String,
    required: true,
    min: 3
  },
  Lname: {
    type: String,
    required: true,
    min: 3
  },
  Email: {
    type: String,
    required: true,
    min: 8
  },
  Password: {
    type: String,
    required: true,
    min: 8
  },
  Number: {
    type: String
  },
  date: {
    type: Date,
    "default": Date.now
  }
}); //module.exports = mongoose.model('Users', UserSchema);


var Users = _mongoose["default"].model('Users', UserSchema);

var _default = Users;
exports["default"] = _default;