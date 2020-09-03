"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var commentvalidation = function commentvalidation(data) {
  var schema = _joi["default"].object({
    Comments: _joi["default"].string().min(2).required()
  });

  return schema.validate(data);
}; //module.exports.commentvalidation = commentvalidation;


var _default = commentvalidation;
exports["default"] = _default;