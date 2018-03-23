const async       = require("async");
const createError = require("http-errors");
const response    = require("../core/response");
const config      = require("../../config/app");
const ctrlToken   = require("../modules/system/controllers/ctrl_token");

exports.authenticate = (req, res, next) => {

  const token  = req.headers[config.tokenHeader] || "";

  if (!token) {
    response.send(req, res, new createError.Unauthorized(), "");
    return;
  }

  const verifyToken  = (done) => {
    ctrlToken.verify(token, (err, rs) => {
      if (err) {
        return done(new createError.Unauthorized());
      } else {
        req.user = rs.user;
        req.token = token;
        return done(undefined);
      }
    });
  };

  const updateToke = (done) => {
    ctrlToken.update(token, (err) => {
      if (err) {
        return done(new createError.Unauthorized())
      } else {
        return done(undefined);
      }
    });
  };
  async.waterfall([verifyToken, updateToke], (err) => {
    if (err) {
      response.send(req, res, new createError.Unauthorized(), "");
      return;
    } else {
      next();
    }
  });
};