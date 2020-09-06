"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _verifytoken = _interopRequireDefault(require("./verifytoken.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _usermodel = _interopRequireDefault(require("../models/usermodel.js"));

var _uservalidation = require("../Validations/uservalidation.js");

_dotenv["default"].config();

var router = _express["default"].Router();

//import loginvalidation from '../Validations/uservalidation.js';
//Register User
router.post('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _regvalidation, error, emailExist, salt, hashedPassword, newuser, newdata;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Validate register before submitting
            _regvalidation = (0, _uservalidation.regvalidation)(req.body), error = _regvalidation.error;

            if (!error) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              err: error.details[0].message
            }));

          case 3:
            _context.next = 5;
            return _usermodel["default"].findOne({
              Email: req.body.Email
            });

          case 5:
            emailExist = _context.sent;

            if (!emailExist) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'Email already exists'
            }));

          case 8:
            _context.next = 10;
            return _bcryptjs["default"].genSalt(10);

          case 10:
            salt = _context.sent;
            _context.next = 13;
            return _bcryptjs["default"].hash(req.body.Password, salt);

          case 13:
            hashedPassword = _context.sent;
            //Creating new User
            newuser = (0, _usermodel["default"])({
              Fname: req.body.Fname,
              Lname: req.body.Lname,
              Email: req.body.Email,
              Password: hashedPassword
            });
            newdata = (0, _usermodel["default"])({
              Fname: req.body.Fname,
              Lname: req.body.Lname
            });
            _context.prev = 16;
            _context.next = 19;
            return newuser.save();

          case 19:
            res.json(newdata);
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](16);
            res.json({
              message: _context.t0
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[16, 22]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //Logging in user

router.post('/login', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _loginvalidation, error, user, validpassword, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //Validate register before loggin user in
            _loginvalidation = (0, _uservalidation.loginvalidation)(req.body), error = _loginvalidation.error;

            if (!error) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context2.next = 5;
            return _usermodel["default"].findOne({
              Email: req.body.Email
            });

          case 5:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('Email does not exists'));

          case 8:
            _context2.next = 10;
            return _bcryptjs["default"].compare(req.body.Password, user.Password);

          case 10:
            validpassword = _context2.sent;

            if (validpassword) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('Heheheh...Password does not exists'));

          case 13:
            // Creating Token
            token = _jsonwebtoken["default"].sign({
              _id: user._id
            }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send({
              token: token
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //Get back all Users

router.get('/', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _usermodel["default"].find();

          case 3:
            users = _context3.sent;
            // data = users({
            //     Fname: req.body.Fname,
            //     Lname: req.body.Lname
            // });
            res.json(users);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.json({
              message: _context3.t0
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //Get Specific User

router.get('/:userId', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _usermodel["default"].findById(req.params.userId);

          case 3:
            user = _context4.sent;
            res.json(user);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.send({
              message: _context4.t0
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //Delete User

router["delete"]('/:userId', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var deletedUser;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _usermodel["default"].remove({
              _id: req.user._id
            });

          case 3:
            deletedUser = _context5.sent;
            res.json('Succesfully deleted');
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.json({
              message: _context5.t0
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); //Update user

router.patch('/update', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _regvalidation2, error, salt, hashedPassword, updatedUser;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            //Validate register before submitting
            _regvalidation2 = (0, _uservalidation.regvalidation)(req.body), error = _regvalidation2.error;

            if (!error) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context6.next = 5;
            return _bcryptjs["default"].genSalt(10);

          case 5:
            salt = _context6.sent;
            _context6.next = 8;
            return _bcryptjs["default"].hash(req.body.Password, salt);

          case 8:
            hashedPassword = _context6.sent;
            _context6.prev = 9;
            _context6.next = 12;
            return _usermodel["default"].updateOne({
              _id: req.user._id
            }, {
              $set: {
                Fname: req.body.Fname,
                Lname: req.body.Lname,
                Email: req.body.Email,
                Password: req.body.Password
              }
            });

          case 12:
            updatedUser = _context6.sent;
            res.json('Succesfully updated User');
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](9);
            res.json({
              message: _context6.t0
            });

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[9, 16]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;