"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginvalidation = exports.regvalidation = void 0;

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

exports.regvalidation = regvalidation;

var loginvalidation = function loginvalidation(data) {
  var schema = _joi["default"].object({
    Email: _joi["default"].string().min(8).required().email(),
    Password: _joi["default"].string().min(8).required()
  });

  return schema.validate(data);
}; //module.exports.loginvalidation = loginvalidation;
//module.exports.regvalidation = regvalidation;
//export default {loginvalidation, regvalidation}


exports.loginvalidation = loginvalidation;