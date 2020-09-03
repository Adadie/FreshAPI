"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var PostSchema = _mongoose["default"].Schema({
  Author_names: {
    type: String,
    required: true
  },
  Title: {
    type: String,
    required: true
  },
  Content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
}); //module.exports = mongoose.model('Posts', PostSchema);


var Posts = _mongoose["default"].model('Posts', PostSchema);

var _default = Posts;
exports["default"] = _default;