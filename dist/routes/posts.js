"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _postmodel = _interopRequireDefault(require("../models/postmodel.js"));

var _verifytoken = _interopRequireDefault(require("./verifytoken.js"));

var _postvalidations = _interopRequireDefault(require("../Validations/postvalidations.js"));

var router = _express["default"].Router();

//import {commentvalidation} from '../Validations/commentvalidation.js';
//Submit Posts
router.post('/', _verifytoken["default"], function (req, res) {
  //Validate post before submitting
  var _postvalidation = (0, _postvalidations["default"])(req.body),
      error = _postvalidation.error;

  if (error) {
    return res.status(400).send(error.details[0].message);
  } //Create new post


  var post = new _postmodel["default"]({
    Author_names: req.body.Author_names,
    Title: req.body.Title,
    Content: req.body.Content
  });
  post.save().then(function (data) {
    res.json({
      data: data,
      id: req.user._id
    });
  })["catch"](function (err) {
    res.json({
      message: err
    });
  });
}); //Get back all posts

router.get('/', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var posts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _postmodel["default"].find();

          case 3:
            posts = _context.sent;
            res.status(200).json(posts);
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
}()); //Get Specific Post

router.get('/:postId', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var post;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _postmodel["default"].findById(req.params.postId);

          case 3:
            post = _context2.sent;
            res.json(post);
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
}()); //Delete Post

router["delete"]('/Delete', _verifytoken["default"], /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var deletedPost;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _postmodel["default"].remove({
              _id: req.user._id
            });

          case 3:
            deletedPost = _context4.sent;
            res.json('Successfully Deleted Post');
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.json({
              message: _context4.t0
            });

          case 10:
            //Update posts
            router.patch('/:postId', _verifytoken["default"], /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
                var _postvalidation2, error, updatedPost;

                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        //Validate register before updating
                        _postvalidation2 = (0, _postvalidations["default"])(req.body), error = _postvalidation2.error;

                        if (!error) {
                          _context3.next = 3;
                          break;
                        }

                        return _context3.abrupt("return", res.status(400).send(error.details[0].message));

                      case 3:
                        _context3.prev = 3;
                        _context3.next = 6;
                        return _postmodel["default"].updateOne({
                          _id: req.params.postId
                        }, {
                          $set: {
                            Author_names: req.body.Author_names,
                            Title: req.body.Title,
                            Content: req.body.Content
                          }
                        });

                      case 6:
                        updatedPost = _context3.sent;
                        res.json('Successfully Updated Post');
                        _context3.next = 13;
                        break;

                      case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3["catch"](3);
                        res.json({
                          message: _context3.t0
                        });

                      case 13:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[3, 10]]);
              }));

              return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
              };
            }()); //Commenting

            router.post('/comment', _verifytoken["default"], function (req, res) {
              //Validate message before submitting
              var _commentvalidation = commentvalidation(req.body),
                  error = _commentvalidation.error;

              if (error) {
                return res.status(400).send(error.details[0].message);
              }

              var comment = new Comment({
                Comments: req.body.Comments
              });
              comment.save().then(function (data) {
                res.json(data);
              })["catch"](function (err) {
                res.json({
                  message: err
                });
              });
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;