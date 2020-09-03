"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var CommentSchema = _mongoose["default"].Schema({
  Comments: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});

module.exports = _mongoose["default"].model('Comment', CommentSchema);