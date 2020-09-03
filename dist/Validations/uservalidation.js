"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var regvalidation = function regvalidation(data) {
  var schema = _joi["default"].object({
    Fname: _joi["default"].string().min(3).required(),
    Lname: _joi["default"].string().min(3).required(),
    Email: _joi["default"].string().min(8).required().email(),
    Password: _joi["default"].string().min(8).required()
  });

  return schema.validate(data);
};

var loginvalidation = function loginvalidation(data) {
  var schema = _joi["default"].object({
    Email: _joi["default"].string().min(8).required().email(),
    Password: _joi["default"].string().min(8).required()
  });

  return schema.validate(data);
}; //module.exports.loginvalidation = loginvalidation;
//module.exports.regvalidation = regvalidation;


var _default = {
  loginvalidation: loginvalidation,
  regvalidation: regvalidation
};
exports["default"] = _default;