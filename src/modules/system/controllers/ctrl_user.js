const async       = require("async");
const _           = require("lodash");
const createError = require("http-errors");
const Joi         = require("joi");
const Token       = require("./ctrl_token");
const UserSchema  = require("../models/mod_user");
const Model       = require("../../../core/model");
const log         = require("../../../core/logger");
const helper      = require("../../../core/helper");
const constant    = require("../../../core/constant");

const { DB_NAME_HIONE, SCHEMA_USER } = constant;

exports.simpleLogin = (req, res, callback) => {

  log.info("user.simpleLogin() start.");

  const ModelUser = new Model(DB_NAME_HIONE, SCHEMA_USER, UserSchema);

  let { name, pass } = req.body;
  let obj  = {
    user: {},
    token: ""
  };

  let checkParam = (done) => {
    let schema = Joi.object({
      name: Joi.string().trim().invalid([":", ";", ",", "\""]).max(40).required(),
      pass: Joi.string().max(40).required()
    });
    let output = Joi.validate(req.body, schema, {allowUnknown: true});
    if (output.error) {
      log.debug("user.simpleLogin().checkParam() error.");
      return done(new createError.BadRequest(__("modules.system.user.login.error")));
    }
    done(undefined);
  };

  let authUser = (done) => {
    let sha256Pass = helper.sha256(pass);
    let condition = { userId: name, "valid": 1};
    let projection = "userId name password email";

    ModelUser.getOne(condition, projection, (err, result) => {
      if (err) {
        log.debug("user.simpleLogin().authUser() error.");
        log.error(err);
        return done(new createError.InternalServerError(__("common.db.search.error")));
      } else {
        if (!result || (result.password != sha256Pass)) {
          log.debug("user.simpleLogin().authUser() error.");
          return done(new createError.BadRequest(__("modules.system.user.login.error")));
        } else {
          delete result._doc.password;
          obj.user = result;
          return done(undefined);
        }
      }
    });
  };

  let createToke = (done) => {
    Token.create(obj.user, (err, result) => {
      if (err || !result) {
        log.debug("user.simpleLogin().createToke() error.");
        return done(new createError.InternalServerError(__("common.system.error")))
      } else {
        obj.token = result.token;
        obj.tokenType = constant.TOKENTYPE;
        log.info("user.simpleLogin() end.");
        log.operation("simpleLogin", "login success!", obj.user);
        return done(undefined, obj);
      }
    });
  };

  async.waterfall([checkParam, authUser, createToke], callback);
};

exports.logout = (req, res, callback) => {

  log.info("user.logout() start.", req.user);

  Token.delete(req.token, (err) => {
    if (err) {
      log.debug("user.logout() error.");
      log.error(err);
      return callback(new createError.InternalServerError(__("common.system.error")))
    } else {
      log.info("user.logout() end.", req.user);
      log.operation("logout", "logout success!", req.user);
      return callback(undefined);
    }
  });
};