"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var messagevalidation = function messagevalidation(data) {
  var schema = _joi["default"].object({
    Names: _joi["default"].string().min(3).required(),
    Email: _joi["default"].string().min(8).required().email(),
    Message: _joi["default"].string().min(8).required(),
    Comments: _joi["default"].string().min(8).required()
  });

  return schema.validate(data);
}; //module.exports.messsagevalidation = messagevalidation;


var _default = messagevalidation;
exports["default"] = _default;