"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should(); //Sending data test


describe('app', function () {
  it('display landing page', function (done) {
    _chai["default"].request(_index["default"]).get('/').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});