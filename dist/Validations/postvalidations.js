"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var postvalidation = function postvalidation(data) {
  var schema = _joi["default"].object({
    Author_names: _joi["default"].string().min(3).required(),
    Title: _joi["default"].string().min(3).required(),
    Content: _joi["default"].string().min(8).required()
  });

  return schema.validate(data);
}; //module.exports.postvalidation = postvalidation;


var _default = postvalidation;
exports["default"] = _default;