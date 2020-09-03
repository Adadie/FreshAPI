"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var MessageSchema = _mongoose["default"].Schema({
  Names: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  },
  Comments: {
    type: String
  },
  date: {
    type: Date,
    "default": Date.now
  }
}); //module.exports = mongoose.model('Messages', MessageSchema);


var Messages = _mongoose["default"].model('Messages', MessageSchema);

var _default = Messages;
exports["default"] = _default;