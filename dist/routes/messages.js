"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _messagemodel = _interopRequireDefault(require("../models/messagemodel.js"));

var _verifytoken = _interopRequireDefault(require("./verifytoken.js"));

var _messagevalidation3 = _interopRequireDefault(require("../Validations/messagevalidation.js"));

var router = _express["default"].Router();

//Submit Message
router.post('/', _verifytoken["default"], function (req, res) {
  //Validate message before submitting
  var _messagevalidation = (0, _messagevalidation3["default"])(req.body),
      error = _messagevalidation.error;

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  var message = new _messagemodel["default"]({
    Names: req.body.Names,
    Email: req.body.Email,
    Message: req.body.Message
  });
  message.save().then(function (data) {
    res.json(data);
  })["catch"](function (err) {
    res.json({
      message: err
    });
  });
}); //Get back all messages

router.get('/', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var messages;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _messagemodel["default"].find();

          case 3:
            messages = _context.sent;
            res.json(messages);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.json({
              message: _context.t0
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //Get Specific Message

router.get('/:messageId', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var message;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _messagemodel["default"].findById(req.params.messageId);

          case 3:
            message = _context2.sent;
            res.json(message);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.json({
              message: _context2.t0
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //Delete Message

router["delete"]('/:messageId', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var deletedMessage;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _messagemodel["default"].remove({
              _id: req.params.messageId
            });

          case 3:
            deletedMessage = _context3.sent;
            res.json(deletedMessage);
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
}()); //Update Message

router.patch('/:messageId', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _messagevalidation2, error, updatedMessage;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //Validate post before updating
            _messagevalidation2 = (0, _messagevalidation3["default"])(req.body), error = _messagevalidation2.error;

            if (!error) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return _messagemodel["default"].updateOne({
              _id: req.params.messageId
            }, {
              $set: {
                Names: req.body.Names,
                Email: req.body.Email,
                Message: req.body.Message
              }
            });

          case 6:
            updatedMessage = _context4.sent;
            res.json(updatedMessage);
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](3);
            res.json({
              message: _context4.t0
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 10]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;