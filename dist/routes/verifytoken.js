"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/*module.exports =*/
function verify(req, res, next) {
  var token = req.header('auth-token');

  if (!token) {
    return res.status(401).send('Access denied, first login to continue');
  }

  try {
    var verified = _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token ');
  }
}

var _default = verify;
exports["default"] = _default;