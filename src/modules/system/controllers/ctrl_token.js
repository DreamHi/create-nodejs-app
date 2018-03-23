const crypto        = require("crypto");
const createError   = require("http-errors");
const Model         = require("../../../core/model");
const log           = require("../../../core/logger");
const constant      = require("../../../core/constant");
const app           = require("../../../../config/app");
const tokenSchema   = require("../models/mod_token");

const { tokenLength,  tokenExpires } = app;
const { DB_NAME_TEMPLATE, SCHEMA_TOKEN } = constant;
const ModelToken = new Model(DB_NAME_TEMPLATE, SCHEMA_TOKEN, tokenSchema);

exports.create = (user, callback) => {
  const token = crypto.randomBytes(tokenLength).toString("hex");
  const expires = new Date(Date.now() + tokenExpires);
  const obj = { token, user, expires };
  ModelToken.create(obj, (err, result) => {
    log.operation("create", "token has been created successfully!", {});
    callback(err, result);
  })
};

exports.verify = (token, callback) => {
  const condition = { token };
  ModelToken.getOne(condition, "", (err, result) => {
    if (err || !result) {
      return callback(new createError.Unauthorized());
    } else {
      if (result.expires < new Date()) {
        return callback(new createError.Unauthorized());
      } else {
        log.operation("verify", "token has been verified successfully!", {});
        return callback(undefined, result);
      }
    }
  })
};

exports.update = (token, callback) => {
  const condition = { token };
  const expires = new Date(Date.now() + tokenExpires);
  const obj = { expires };
  ModelToken.updateByCondition(condition, obj, {}, (err, result) => {
    if (err || !result) {
      return callback(new createError.Unauthorized());
    } else {
      log.operation("update", "token has been updated successfully!", {});
      return callback(undefined);
    }
  })
};

exports.delete = (token, callback) => {
  const condition = { token };
  ModelToken.delete(condition, (err) => {
    if (err) {
      return callback(new createError.InternalServerError());
    } else {
      log.operation("delete", "token has been deleted successfully!", {});
      return callback(undefined);
    }
  })
};